import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ stats }) {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">

                    {/* Welcome */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-800">
                            Welcome back, {auth.user.name}!
                        </h3>
                        <p className="text-gray-500 mt-1 text-sm">Manage your support tickets from here.</p>
                        <Link
                            href={route('tickets.create')}
                            className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-sm font-semibold shadow"
                        >
                            + Create New Ticket
                        </Link>
                    </div>

                    {/* Stats */}
                    {stats && (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div className="bg-white shadow-sm sm:rounded-lg p-5 text-center">
                                <div className="text-3xl font-bold text-indigo-600">{stats.total}</div>
                                <div className="text-sm text-gray-500 mt-1">Total</div>
                            </div>
                            <div className="bg-white shadow-sm sm:rounded-lg p-5 text-center">
                                <div className="text-3xl font-bold text-green-600">{stats.open}</div>
                                <div className="text-sm text-gray-500 mt-1">Open</div>
                            </div>
                            <div className="bg-white shadow-sm sm:rounded-lg p-5 text-center">
                                <div className="text-3xl font-bold text-purple-600">{stats.in_progress}</div>
                                <div className="text-sm text-gray-500 mt-1">In Progress</div>
                            </div>
                            <div className="bg-white shadow-sm sm:rounded-lg p-5 text-center">
                                <div className="text-3xl font-bold text-blue-600">{stats.resolved}</div>
                                <div className="text-sm text-gray-500 mt-1">Resolved</div>
                            </div>
                        </div>
                    )}

                    {/* Quick link */}
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg p-6 flex justify-between items-center">
                        <span className="text-gray-700 font-medium">View all your tickets</span>
                        <Link href={route('tickets.index')} className="text-indigo-600 hover:underline text-sm font-semibold">
                            Go to Tickets →
                        </Link>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
