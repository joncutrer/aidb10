'use client';

import { useState, useEffect } from 'react';
import { Week } from '@/lib/store';
import { WeekCard } from '@/components/WeekCard';
import { WeekModal } from '@/components/WeekModal';
import { Sparkles, Trophy, Target } from 'lucide-react';

export default function Home() {
    const [weeks, setWeeks] = useState<Week[]>([]);
    const [selectedWeek, setSelectedWeek] = useState<Week | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchWeeks();
    }, []);

    const fetchWeeks = async () => {
        try {
            const res = await fetch('/api/weeks');
            const data = await res.json();
            setWeeks(data);
        } catch (error) {
            console.error('Failed to fetch weeks', error);
        } finally {
            setLoading(false);
        }
    };

    const handleWeekUpdate = (updatedWeek: Week) => {
        setWeeks(weeks.map(w => w.id === updatedWeek.id ? updatedWeek : w));
    };

    const completedCount = weeks.filter(w => w.isCompleted).length;
    const progress = (completedCount / 10) * 100;

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background text-primary animate-pulse">
                <Sparkles className="w-12 h-12" />
            </div>
        );
    }

    return (
        <main className="app-container">
            {/* Hero Section */}
            <header className="hero">
                <div className="hero-badge">
                    <Sparkles className="w-4 h-4" />
                    <span>AI Mastery 2026</span>
                </div>
                <h1 className="hero-title">
                    10 Week AI Challenge
                </h1>
                <p className="hero-subtitle">
                    Master the future of technology, one week at a time. Track your linear progress into the age of intelligence.
                </p>
            </header>

            {/* Progress Section */}
            <section className="progress-section">
                <div className="card stat-card glass-card">
                    <div className="icon-wrapper">
                        <Target className="w-6 h-6" />
                    </div>
                    <div className="stat-content">
                        <p className="label">Current Stage</p>
                        <p className="value">{completedCount} / 10</p>
                    </div>
                </div>

                <div className="card progress-card glass-card">
                    <div className="progress-header">
                        <span className="progress-label">Overall Mastery Progress</span>
                        <span className="progress-percent">{Math.round(progress)}%</span>
                    </div>
                    <div className="progress-track">
                        <div
                            className="progress-bar"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </section>

            {/* Weekly Grid */}
            <section className="grid">
                {weeks.map((week) => (
                    <WeekCard
                        key={week.id}
                        week={week}
                        onClick={setSelectedWeek}
                    />
                ))}
            </section>

            {/* Modal */}
            {selectedWeek && (
                <WeekModal
                    week={selectedWeek}
                    onClose={() => setSelectedWeek(null)}
                    onUpdate={handleWeekUpdate}
                />
            )}
        </main>
    );
}
