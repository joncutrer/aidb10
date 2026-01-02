'use client';

import { Week } from '@/lib/store';
import { cn } from '@/lib/utils';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';

interface WeekCardProps {
    week: Week;
    onClick: (week: Week) => void;
}

export function WeekCard({ week, onClick }: WeekCardProps) {
    return (
        <div
            onClick={() => onClick(week)}
            className={`week-card ${week.isCompleted ? 'is-completed' : ''}`}
        >
            <div className="card-top">
                <span className="badge-id">WEEK {week.id}</span>
                <div className="status-indicator" />
            </div>

            <h3 className="card-title">
                {week.title.replace(/^Week \d+: /, '')}
            </h3>

            <p className="card-desc">
                {week.description}
            </p>

            <div className="card-action">
                <span>View Details</span>
                <ArrowRight className="w-4 h-4" />
            </div>
        </div>
    );
}
