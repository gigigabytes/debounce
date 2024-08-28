import './tailwind.output.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    let timeout = null;

    const debouncedSearch = (e) => {
        clearTimeout(timeout);
        const value = e.target.value;
        setQuery(value);

        timeout = setTimeout(() => {
            searchBooks(value);
        }, 300);
    };

    const searchBooks = async (query) => {
        if (query) {
            try {
                const response = await axios.get(`/api/books/?q=${query}`);
                setResults(response.data);
            } catch (error) {
                console.error("There was an error fetching the book data!", error);
            }
        } else {
            setResults([]);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-8">Debounce</h1>
                <input
                    type="text"
                    placeholder="Search for books..."
                    value={query}
                    onChange={debouncedSearch}
                    className="w-96 p-4 text-lg text-gray-800 rounded-lg shadow-lg outline-none focus:ring-2 focus:ring-purple-400"
                />
                <ul className="mt-4 text-white">
                    {results.map((book, index) => (
                        <li key={index}>{book.title} by {book.author}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;
