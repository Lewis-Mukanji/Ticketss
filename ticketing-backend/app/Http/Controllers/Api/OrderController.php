<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use App\Models\Order;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $orders = $request->user()->orders()->with('tickets.event')->latest()->get();
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'event_id' => 'required|exists:events,id',
            'quantity' => 'required|integer|min:1',
            'payment_method' => 'required|string',
            'payment_id' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $event = Event::findOrFail($request->event_id);

        // Check if enough tickets are available
        if ($event->available_tickets < $request->quantity) {
            return response()->json([
                'message' => 'Not enough tickets available',
            ], 400);
        }

        // Create order
        $totalAmount = $event->price * $request->quantity;
        
        $order = Order::create([
            'user_id' => $request->user()->id,
            'total_amount' => $totalAmount,
            'quantity' => $request->quantity,
            'payment_status' => 'completed',
            'payment_method' => $request->payment_method,
            'payment_id' => $request->payment_id,
        ]);

        // Create tickets
        $tickets = [];
        
        for ($i = 0; $i < $request->quantity; $i++) {
            $ticketNumber = Str::uuid();
            
            // Generate QR code
            $qrCodeData = json_encode([
                'ticket_number' => $ticketNumber,
                'event_id' => $event->id,
                'event_title' => $event->title,
                'event_date' => $event->event_date,
                'event_location' => $event->location,
            ]);
            
            $qrCodePath = 'tickets/qr_' . $ticketNumber . '.png';
            $qrCode = QrCode::format('png')
                ->size(300)
                ->generate($qrCodeData);
            
            Storage::disk('public')->put($qrCodePath, $qrCode);
            
            $ticket = Ticket::create([
                'order_id' => $order->id,
                'event_id' => $event->id,
                'user_id' => $request->user()->id,
                'ticket_number' => $ticketNumber,
                'qr_code' => $qrCodePath,
                'is_used' => false,
            ]);
            
            $tickets[] = $ticket;
        }

        // Update available tickets
        $event->available_tickets -= $request->quantity;
        $event->save();

        // Send tickets by email (a placeholder for the implementation)
        // Mail::to($request->user()->email)->send(new TicketsMail($tickets, $event, $order));

        return response()->json([
            'message' => 'Order placed successfully',
            'order' => $order->load('tickets'),
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $order = Order::where('user_id', $request->user()->id)
            ->where('id', $id)
            ->with('tickets.event')
            ->firstOrFail();
            
        return response()->json($order);
    }
}