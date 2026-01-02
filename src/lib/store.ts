import fs from 'fs/promises';
import path from 'path';

export interface Week {
    id: number;
    title: string;
    description: string;
    isCompleted: boolean;
    notes: string;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'weeks.json');

const INITIAL_WEEKS: Week[] = [
    { id: 1, title: 'Week 1: Foundations', description: 'Understand the basics of AI, LLMs, and Prompt Engineering.', isCompleted: false, notes: '' },
    { id: 2, title: 'Week 2: Prompt Engineering', description: 'Deep dive into advanced prompting techniques (Chain of Thought, Few-Shot).', isCompleted: false, notes: '' },
    { id: 3, title: 'Week 3: APIs & Integration', description: 'Learn to use OpenAI/Gemini APIs in Python/Node.js.', isCompleted: false, notes: '' },
    { id: 4, title: 'Week 4: RAG Basics', description: 'Build a simple Retrieval-Augmented Generation system.', isCompleted: false, notes: '' },
    { id: 5, title: 'Week 5: Vector Databases', description: 'Explore Weaviate, Pinecone, or ChromaDB for embeddings.', isCompleted: false, notes: '' },
    { id: 6, title: 'Week 6: Agents', description: 'Build a basic autonomous agent using LangChain or AutoGen.', isCompleted: false, notes: '' },
    { id: 7, title: 'Week 7: Fine-Tuning', description: 'Learn the concepts of fine-tuning models on custom datasets.', isCompleted: false, notes: '' },
    { id: 8, title: 'Week 8: Computer Vision', description: 'Work with multimodal models for image analysis.', isCompleted: false, notes: '' },
    { id: 9, title: 'Week 9: Voice & Audio', description: 'Integrate TTS and STT models for voice interaction.', isCompleted: false, notes: '' },
    { id: 10, title: 'Week 10: Final Project', description: 'Build a comprehensive AI application combining previous weeks.', isCompleted: false, notes: '' },
];

async function ensureDataDir() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
    }
}

export async function getWeeks(): Promise<Week[]> {
    await ensureDataDir();
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist or is invalid, write initial data
        await fs.writeFile(DATA_FILE, JSON.stringify(INITIAL_WEEKS, null, 2));
        return INITIAL_WEEKS;
    }
}

export async function updateWeek(id: number, updates: Partial<Week>): Promise<Week | null> {
    const weeks = await getWeeks();
    const index = weeks.findIndex((w) => w.id === id);
    if (index === -1) return null;

    weeks[index] = { ...weeks[index], ...updates };
    await fs.writeFile(DATA_FILE, JSON.stringify(weeks, null, 2));
    return weeks[index];
}
