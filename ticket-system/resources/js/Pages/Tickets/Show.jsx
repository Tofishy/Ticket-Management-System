import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Show({ auth, ticket }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Ticket Details #{ticket.id}</h2>}
        >
            <Head title={`Ticket #${ticket.id}`} />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-gray-900">{ticket.title}</h3>
                            <p className="text-xs text-gray-500 mt-1">Created at: {new Date(ticket.created_at).toLocaleString()}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div><span className="font-semibold text-gray-600">Category:</span> {ticket.category}</div>
                            <div><span className="font-semibold text-gray-600">Priority:</span> {ticket.priority}</div>
                            <div><span className="font-semibold text-gray-600">Status:</span> {ticket.status}</div>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-semibold text-gray-700 mb-2">Description:</h4>
                            <p className="bg-gray-50 p-4 rounded-md text-gray-800 whitespace-pre-wrap">{ticket.description}</p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <Link href={route('tickets.edit', ticket.id)} className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm font-semibold">Edit Ticket</Link>
                            <Link href={route('tickets.index')} className="text-gray-600 hover:underline text-sm font-semibold">Back to Tickets</Link>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}