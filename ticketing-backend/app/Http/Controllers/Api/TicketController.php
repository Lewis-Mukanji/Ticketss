<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        $tickets = $request->user()->tickets()->with('event')->get();
        return response()->json($tickets);
    }

    public function show(Request $request, $id)
    {
        $ticket = Ticket::where('user_id', $request->user()->id)
            ->where('id', $id)
            ->with('event')
            ->firstOrFail();
            
        return response()->json($ticket);
    }

    public function download($id)
    {
        $ticket = Ticket::with('event', 'user')->findOrFail($id);
        
        // Check if user owns the ticket or is admin
        if (auth()->user()->id !== $ticket->user_id) {
            return response()->json([
                'message' => 'Unauthorized',
            ], 403);
        }
        
        // Return the QR code image
        return response()->download(
            Storage::disk('public')->path($ticket->qr_code),
            'ticket_' . $ticket->ticket_number . '.png'
        );
    }

    public function verify(Request $request)
    {
        $ticketNumber = $request->ticket_number;
        
        $ticket = Ticket::where('ticket_number', $ticketNumber)->with('event', 'user')->first();
        
        if (!$ticket) {
            return response()->json([
                'valid' => false,
                'message' => 'Ticket not found',
            ], 404);
        }
        
        if ($ticket->is_used) {
            return response()->json([
                'valid' => false,
                'message' => 'Ticket already used',
                'ticket' => $ticket,
            ], 400);
        }
        
        return response()->json([
            'valid' => true,
            'message' => 'Valid ticket',
            'ticket' => $ticket,
        ]);
    }

    public function markAsUsed(Request $request)
    {
        $ticketNumber = $request->ticket_number;
        
        $ticket = Ticket::where('ticket_number', $ticketNumber)->first();
        
        if (!$ticket) {
            return response()->json([
                'message' => 'Ticket not found',
            ], 404);
        }
        
        if ($ticket->is_used) {
            return response()->json([
                'message' => 'Ticket already used',
            ], 400);
        }
        
        $ticket->is_used = true;
        $ticket->save();
        
        return response()->json([
            'message' => 'Ticket marked as used',
            'ticket' => $ticket,
        ]);
    }
}