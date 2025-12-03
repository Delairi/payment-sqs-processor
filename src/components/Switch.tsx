import React, { useEffect, useState } from 'react'

interface SwitchProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
    checked?: boolean
    defaultChecked?: boolean
    onChange?: (checked: boolean) => void
    ariaLabel?: string
}

const Switch = ((props: SwitchProps) => {
    const {
        checked: controlledChecked,
        defaultChecked = false,
        onChange,
        disabled = false,
        className = '',
        ariaLabel,
        id,
        ...rest
    } = props

    const isControlled = controlledChecked !== undefined
    const [internalChecked, setInternalChecked] = useState<boolean>(!!defaultChecked)
    const checked = isControlled ? !!controlledChecked : internalChecked

    useEffect(() => {
        if (!isControlled) return
        // keep internal state in sync for any side-effects (no-op here)
    }, [controlledChecked, isControlled])

    const toggle = () => {
        if (disabled) return
        const next = !checked
        if (!isControlled) setInternalChecked(next)
        onChange?.(next)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault()
            toggle()
        }
    }

    return (
        <button
            id={id}
            role="switch"
            aria-checked={checked}
            aria-label={ariaLabel}
            type="button"
            disabled={disabled}
            onClick={toggle}
            onKeyDown={handleKeyDown}
            className={
                `relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ` +
                (checked ? 'bg-indigo-600' : 'bg-gray-200') +
                (disabled ? ' opacity-50 cursor-not-allowed' : ' cursor-pointer') +
                (className ? ` ${className}` : '')
            }
            {...rest}
        >
            <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'
                    }`}
            />
        </button>
    )
})

export default Switch
