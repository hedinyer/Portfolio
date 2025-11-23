'use client'
import { useState } from 'react'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const initialItems = [
    { id: '1', title: 'Project Alpha', color: 'bg-neutral-800' },
    { id: '2', title: 'Project Beta', color: 'bg-neutral-700' },
    { id: '3', title: 'Project Gamma', color: 'bg-neutral-600' },
    { id: '4', title: 'Project Delta', color: 'bg-neutral-500' },
    { id: '5', title: 'Project Epsilon', color: 'bg-neutral-400' },
    { id: '6', title: 'Project Zeta', color: 'bg-neutral-300' },
]

function SortableItem(props: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`aspect-square ${props.color} p-8 flex items-end cursor-grab active:cursor-grabbing hover:scale-[0.98] transition-transform duration-300 border border-white/10`}
        >
            <h3 className="text-2xl font-bold text-white mix-blend-difference">{props.title}</h3>
        </div>
    )
}

export default function PortfolioGrid() {
    const [items, setItems] = useState(initialItems)
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event

        if (over && active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id)
                const newIndex = items.findIndex((item) => item.id === over.id)
                return arrayMove(items, oldIndex, newIndex)
            })
        }
    }

    return (
        <section className="relative z-10 min-h-screen py-20 px-8 md:px-20 text-white mix-blend-difference">
            <h2 className="text-sm font-bold tracking-widest mb-20 uppercase opacity-50">Selected Works</h2>
            <DndContext id="portfolio-dnd" sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={items} strategy={rectSortingStrategy}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {items.map((item) => (
                            <SortableItem key={item.id} id={item.id} title={item.title} color={item.color} />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
        </section>
    )
}
