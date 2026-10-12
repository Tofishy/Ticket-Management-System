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
        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[priority] || 'bg-gray-100 text-gray-800'}`}>
                {priority}
            </span>
        );
    };

    const getStatusBadge = (status) => {
        const colors = {
            Open: 'bg-green-100 text-green-800',
            'In Progress': 'bg-purple-100 text-purple-800',
            Resolved: 'bg-blue-100 text-blue-800',
            Closed: 'bg-gray-100 text-gray-800',
        };
        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
                {status}
            </span>
        );
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
                    {flash.error && (
                        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                            {flash.error}
                        </div>
                    )}

                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-700">All Tickets</h3>
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
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <p className="text-lg mt-2 font-medium">No tickets yet.</p>
                                <p className="text-sm mt-1">Get started by creating your first support ticket!</p>
                                <Link href={route('tickets.create')} className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm font-semibold">
                                    Create Ticket
                                </Link>
                            </div>
                        ) : (
                            <>
                                {/* Desktop table */}
                                <div className="hidden sm:block overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
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
                                                <tr key={ticket.id} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <Link href={route('tickets.show', ticket.id)} className="text-indigo-600 hover:underline font-medium">
                                                            {ticket.title}
                                                        </Link>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.category}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{getPriorityBadge(ticket.priority)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(ticket.status)}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                                                        <Link href={route('tickets.edit', ticket.id)} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
                                                        <button onClick={() => deleteTicket(ticket.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile stacked cards */}
                                <div className="sm:hidden space-y-4">
                                    {tickets.data.map((ticket) => (
                                        <div key={ticket.id} className="border border-gray-200 rounded-lg p-4 shadow-sm">
                                            <Link href={route('tickets.show', ticket.id)} className="text-indigo-600 font-semibold hover:underline text-base block mb-2">
                                                {ticket.title}
                                            </Link>
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {getPriorityBadge(ticket.priority)}
                                                {getStatusBadge(ticket.status)}
                                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">{ticket.category}</span>
                                            </div>
                                            <div className="flex space-x-3 text-sm">
                                                <Link href={route('tickets.edit', ticket.id)} className="text-indigo-600 hover:underline font-medium">Edit</Link>
                                                <button onClick={() => deleteTicket(ticket.id)} className="text-red-600 hover:underline font-medium">Delete</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {tickets.links && tickets.links.length > 3 && (
                                    <div className="mt-6 flex justify-center gap-1 flex-wrap">
                                        {tickets.links.map((link, key) => (
                                            link.url ? (
                                                <Link
                                                    key={key}
                                                    href={link.url}
                                                    className={`px-3 py-1 border rounded text-sm font-medium ${
                                                        link.active
                                                            ? 'bg-indigo-600 text-white border-indigo-600'
                                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                                </Link>
                                            ) : (
                                                <span
                                                    key={key}
                                                    className="px-3 py-1 border rounded text-sm font-medium bg-white text-gray-400 border-gray-200 cursor-not-allowed"
                                                >
                                                    {link.label.replace('&laquo;', '«').replace('&raquo;', '»')}
                                                </span>
                                            )
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
