import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRef } from "react"

type SearchFormProps = {
    label: string,
    name: string,
    value: string,
    maxLength?: number,
    placeholder?: string,
    error?: string | null,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleClear?: () => void,
}

const SearchForm = (props: SearchFormProps) => {
    const {
        label,
        name,
        value,
        maxLength,
        placeholder,
        error,
        handleSubmit,
        handleChange,
        handleClear, 
    } = props
    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <label htmlFor={name} className="search-form__label">
                <span>{label}</span>
            </label>
            <div className='search-form__container'>
                <input
                    ref={inputRef}
                    type="text"
                    name={name}
                    id={name}
                    value={value}
                    maxLength={maxLength}
                    onChange={handleChange}
                    placeholder={placeholder}
                    autoComplete="off"
                    className="search-form__input"
                    aria-invalid={error ? 'true' : undefined}
                    aria-describedby={error ? `${name}-error` : undefined}
                />
                {value && handleClear && (
                    <button
                        type="button"
                        onClick={() => {
                            handleClear();
                            inputRef.current?.focus();
                        }}
                        aria-label="Clear"
                        title="Clear"
                        className="search-form__clear-btn"
                    >
                        <FontAwesomeIcon icon={faXmark} className="clear-icon" />
                    </button>
                )}
                <button
                    type="submit"
                    aria-label="Submit"
                    title="Submit"
                    className="search-form__submit-btn"
                >
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="submit-icon" />
                </button>
            </div>
            {error && <strong id={`${name}-error`} className="error-message">{error}</strong>}
        </form>
    )
}

export default SearchForm;
// 