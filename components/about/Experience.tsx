import { getTranslations } from 'next-intl/server'
import { RevealText } from '@/components/motion'

const experienceKeys = ['olfi', 'uisDegree', 'amv', 'uisProject', 'screaming', 'uisAssistant'] as const

const roleKeys = ['graphicDesigner', 'industrialDesigner', 'designAssistant'] as const

type RoleKey = (typeof roleKeys)[number]

function isRoleKey(value: string): value is RoleKey {
    return roleKeys.some((role) => role === value)
}

export async function Experience() {
    const t = await getTranslations('experience')

    return (
        <section className="mt-24 border-t border-line pt-10 md:mt-32">
            <h2 className="text-[12px] uppercase tracking-[0.16em]">{t('title')}</h2>
            <ol className="mt-10 border-l border-line">
                {experienceKeys.map((key) => {
                    const roleKey = t(`entries.${key}.role`)
                    const role = isRoleKey(roleKey) ? t(`roles.${roleKey}`) : roleKey

                    return (
                        <li key={key} className="relative pl-7 md:pl-10">
                            <span aria-hidden="true" className="absolute top-[0.72em] -left-px h-px w-3.5 bg-foreground" />
                            <div className="grid gap-1 pb-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_13rem] md:items-baseline md:gap-8 md:pb-12">
                                <RevealText as="p" className="text-[17px] leading-snug">
                                    {t(`entries.${key}.company`)}
                                </RevealText>
                                <RevealText as="p" className="font-serif text-[17px] italic leading-snug">
                                    {role}
                                </RevealText>
                                <RevealText as="p" className="text-[12px] uppercase tracking-[0.16em] text-muted">
                                    {t(`entries.${key}.period`)}
                                </RevealText>
                            </div>
                        </li>
                    )
                })}
            </ol>
        </section>
    )
}
