'use client';

import { Spinner } from '@/shared/spinner';
import React, {
    FC,
    ReactNode,
    MouseEventHandler,
    FocusEventHandler,
    KeyboardEventHandler,
    CSSProperties,
} from 'react';
import styled from 'styled-components';

export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonUse =
    | 'default'
    | 'primary'
    | 'success'
    | 'danger'
    | 'pay'
    | 'link'
    | 'text'
    | 'backless';

export interface ButtonComponentProps {
    children: ReactNode;

    /**
     * 	Отключенное состояние кнопки
     */
    disabled?: boolean;

    /**
     * Убирает обводку у кнопки
     */
    borderless?: boolean;

    /**
     * Определяет размер
     */
    size?: ButtonSize | undefined;

    /**
     * 	CSS-свойство width
     */
    width?: string | undefined;

    /**
     * 	HTML-событие onblur
     */
    onBlur?: FocusEventHandler<HTMLButtonElement> | undefined;

    /**
     * HTML-событие onclick
     */
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;

    /**
     * 	HTML-событие onfocus
     */
    onFocus?: FocusEventHandler<HTMLButtonElement> | undefined;

    /**
     * HTML-событие keydown
     */
    onKeyDown?: KeyboardEventHandler<HTMLButtonElement> | undefined;

    /**
     * HTML-событие onmouseenter
     */
    onMouseEnter?: MouseEventHandler<HTMLButtonElement> | undefined;

    /**
     * HTML-событие mouseleave
     */
    onMouseLeave?: MouseEventHandler<HTMLButtonElement> | undefined;

    /**
     * HTML-событие onmouseover
     */
    onMouseOver?: MouseEventHandler<HTMLButtonElement> | undefined;

    /**
     * CSS-свойство `text-align`
     */
    align?: React.CSSProperties['textAlign'];

    /**
     * Сужает кнопку
     */
    narrow?: boolean;

    /**
     * HTML-атрибут style
     */
    style?: CSSProperties | undefined;

    /**
     * HTML-атрибут title
     */
    title?: string | undefined;

    /**
     * HTML-атрибут `type`.
     */
    type?: ButtonType;

    /**
     * 	Переводит кнопку в состояние загрузки
     */
    loading?: boolean | undefined;
}

export const Button: FC<ButtonComponentProps> = ({
    children,
    size = 'small',
    disabled = false,
    width,
    onBlur,
    onClick,
    onFocus,
    onKeyDown,
    onMouseEnter,
    onMouseLeave,
    onMouseOver,
    align,
    borderless,
    narrow,
    style,
    title,
    type = 'button',
    loading = false,
}) => {
    const Button = styled.button`
        background: #fff;

        width: ${width ? width : 'fit-content'};
        height: ${size === 'small' ? '32px' : size === 'medium' ? '40px' : '48px'};

        font-size: ${size === 'small' ? '14px' : size === 'medium' ? '16px' : '18px'};
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        cursor: pointer;
        color: #222;
        border-radius: 8px;
        border: ${borderless ? 'none' : '1px solid rgba(0, 0, 0, 0.16)'};

        display: inline-flex;
        padding: ${narrow ? '6px 12px' : '8px 16px'};
        justify-content: center;
        align-items: center;
        text-align: ${align};
        transition: all 0.2s;
        position: relative;
        overflow: hidden;

        &:hover {
            filter: brightness(96%);
        }
        &:active {
            filter: brightness(90%);
        }
        &:disabled {
            cursor: default;
            color: #adadad;
            border: 1px solid rgba(0, 0, 0, 0.1);

            /* Отключение hover-эффекта */
            &:hover {
                filter: brightness(100%);
            }
            /* Отключение active-эффекта */
            &:active {
                filter: brightness(100%);
            }
        }
    `;
    const SpinnerContainer = styled.div`
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-color: rgba(255, 255, 255, 0.9);
        z-index: 1;
    `;

    const ChildrenText = styled.span`
        visibility: ${loading ? 'hidden' : 'visible'};
    `;

    return (
        <>
            <Button
                type={type}
                title={title}
                style={style}
                onBlur={onBlur}
                onClick={onClick}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
                onMouseLeave={onMouseLeave}
                onMouseEnter={onMouseEnter}
                onMouseOver={onMouseOver}
                disabled={disabled}>
                {loading && (
                    <SpinnerContainer>
                        <Spinner />
                    </SpinnerContainer>
                )}
                <ChildrenText>{children}</ChildrenText>
            </Button>
        </>
    );
};
