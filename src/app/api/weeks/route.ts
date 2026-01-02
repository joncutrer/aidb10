import { NextResponse } from 'next/server';
import { getWeeks, updateWeek } from '@/lib/store';

export async function GET() {
    const weeks = await getWeeks();
    return NextResponse.json(weeks);
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, ...updates } = body;

        if (!id) {
            return NextResponse.json({ error: 'Week ID is required' }, { status: 400 });
        }

        const updatedWeek = await updateWeek(id, updates);

        if (!updatedWeek) {
            return NextResponse.json({ error: 'Week not found' }, { status: 404 });
        }

        return NextResponse.json(updatedWeek);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update week' }, { status: 500 });
    }
}
