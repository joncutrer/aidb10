'use client';

import { useState, useEffect } from 'react';
import { Week } from '@/lib/store';
import { X, Save, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WeekModalProps {
    week: Week;
    onClose: () => void;
    onUpdate: (updatedWeek: Week) => void;
}

export function WeekModal({ week, onClose, onUpdate }: WeekModalProps) {
    const [notes, setNotes] = useState(week.notes);
    const [isCompleted, setIsCompleted] = useState(week.isCompleted);
    const [isSaving, setIsSaving] = useState(false);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/weeks', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: week.id, notes, isCompleted }),
            });

            if (!res.ok) throw new Error('Failed to save');

            const updated = await res.json();
            onUpdate(updated);
            onClose();
        } catch (error) {
            console.error(error);
            alert('Failed to save changes. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <header className="modal-header">
                    <div>
                        <span className="section-label">Week {week.id}</span>
                        <h2>{week.title.replace(/^Week \d+: /, '')}</h2>
                    </div>
                    <button onClick={onClose} className="close-btn">
                        <X className="w-5 h-5" />
                    </button>
                </header>

                <div className="modal-content">
                    <section className="modal-section">
                        <span className="section-label">Challenge Description</span>
                        <p className="modal-description">{week.description}</p>
                    </section>

                    <section className="modal-section">
                        <span className="section-label">Journal & Insights</span>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Document your findings, links, or breakthroughs here..."
                            className="notes-area"
                        />
                    </section>

                    <div
                        className={`toggle-container ${isCompleted ? 'active' : ''}`}
                        onClick={() => setIsCompleted(!isCompleted)}
                    >
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            {isCompleted ? <CheckCircle2 className="w-6 h-6 text-green-400" /> : <Circle className="w-6 h-6 text-gray-400" />}
                            <div>
                                <p style={{ margin: 0, fontWeight: 700 }}>{isCompleted ? 'Mission Accomplished' : 'Mark as Complete'}</p>
                                <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.6 }}>{isCompleted ? 'Great progress! This week is finalized.' : 'Keep pushing forward to finish this week.'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="modal-footer">
                    <button onClick={onClose} className="btn btn-secondary">Cancel</button>
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="btn btn-primary"
                    >
                        {isSaving ? 'Synchronizing...' : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Save className="w-4 h-4" />
                                <span>Save Changes</span>
                            </div>
                        )}
                    </button>
                </footer>
            </div>
        </div>
    );
}
