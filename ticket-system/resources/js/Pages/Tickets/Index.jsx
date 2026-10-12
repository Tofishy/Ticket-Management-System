import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, tickets }) {
    const { flash } = usePage().props;

    const deleteTicket = (id) => {
        if (confirm('Are you sure you want to delete this ticket?')) {
            router.delete(route('tickets.destroy', id));
        }
    };

    const getPriorityBadge = (priority) => {
        const colors = {
            Low: 'bg-gray-100 text-gray-800',
            Medium: 'bg-blue-100 text-blue-800',
            High: 'bg-yellow-100 text-yellow-800',
            Urgent: 'bg-red-100 text-red-800',
        };
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[priority] || 'bg-gray-100 text-gray-800'}`}>{priority}</span>;
    };

    const getStatusBadge = (status) => {
        const colors = {
            Open: 'bg-green-100 text-green-800',
            'In Progress': 'bg-purple-100 text-purple-800',
            Resolved: 'bg-blue-100 text-blue-800',
            Closed: 'bg-gray-100 text-gray-800',
        };
        return <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>{status}</span>;
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Tickets</h2>}
        >
            <Head title="Tickets" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    {flash.success && (
                        <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                            {flash.success}
                        </div>
                    )}

                    <div className="flex justify-between mb-6">
                        <Link
                            href={route('tickets.create')}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 font-semibold text-sm shadow"
                        >
                            + New Ticket
                        </Link>
                    </div>

                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        {tickets.data.length === 0 ? (
                            <div className="text-center py-12 text-gray-500">
                                <p className="text-lg">No tickets found.</p>
                                <p className="text-sm mt-1">Get started by creating your first support ticket!</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {tickets.data.map((ticket) => (
                                            <tr key={ticket.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <Link href={route('tickets.show', ticket.id)} className="text-indigo-600 hover:underline font-medium">
                                                        {ticket.title}
                                                    </Link>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.category}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{getPriorityBadge(ticket.priority)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(ticket.status)}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <Link href={route('tickets.edit', ticket.id)} className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</Link>
                                                    <button onClick={() => deleteTicket(ticket.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Pagination links */}
                                <div className="mt-4 flex justify-between items-center">
                                    {tickets.links.map((link, key) => (
                                        <Link
                                            key={key}
                                            href={link.url || '#'}
                                            className={`px-3 py-1 border rounded text-sm ${link.active ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700'} ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}