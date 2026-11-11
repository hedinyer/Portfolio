import { getTranslations } from 'next-intl/server'

const experienceKeys = ['olfi', 'uisDegree', 'amv', 'uisProject', 'screaming', 'uisAssistant'] as const

const roleKeys = ['graphicDesigner', 'industrialDesigner', 'designAssistant'] as const

type RoleKey = (typeof roleKeys)[number]

function isRoleKey(value: string): value is RoleKey {
    return roleKeys.some((role) => role === value)
}

export async function Experience() {
    const t = await getTranslations('experience')

    return (
        <section className="mt-[calc(28*var(--u))]">
            <h2 className="t-label">{t('title')}</h2>
            <ol className="mt-[calc(10*var(--u))] flex flex-col gap-[calc(14*var(--u))]">
                {experienceKeys.map((key) => {
                    const roleKey = t(`entries.${key}.role`)
                    const role = isRoleKey(roleKey) ? t(`roles.${roleKey}`) : roleKey

                    return (
                        <li
                            key={key}
                            className="grid items-baseline gap-y-[calc(2*var(--u))] md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] md:gap-x-[calc(16*var(--u))] md:gap-y-0"
                        >
                            <p className="t-text min-w-0">{t(`entries.${key}.company`)}</p>
                            <div className="min-w-0">
                                <p className="t-micro">{role}</p>
                                <p className="t-micro">{t(`entries.${key}.period`)}</p>
                            </div>
                        </li>
                    )
                })}
            </ol>
        </section>
    )
}
