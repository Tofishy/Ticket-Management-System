<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TicketController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $user = auth()->user();
        $stats = [
            'total'       => $user->tickets()->count(),
            'open'        => $user->tickets()->where('status', 'Open')->count(),
            'in_progress' => $user->tickets()->where('status', 'In Progress')->count(),
            'resolved'    => $user->tickets()->where('status', 'Resolved')->count(),
        ];
        return Inertia::render('Dashboard', ['stats' => $stats]);
    })->name('dashboard');

    Route::resource('tickets', TicketController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
