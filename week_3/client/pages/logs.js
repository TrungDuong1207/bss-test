import React, { useState, useEffect, useRef } from 'react';
import Layout from '../component/layout/Layout';
import PrivateRoute from '../component/private/PrivateRoute';
import { getLogs } from '../services/logService';

function Logs() {
    const [logs, setLogs] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [name, setName] = useState("");
    const [nameSearch, setNameSearch] = useState("");
    const typingTimeoutRef = useRef(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const token = localStorage.getItem('token');
                let params = {
                    page: currentPage,
                    name: name
                }
                const response = await getLogs(token, params);
                setLogs(response.logs);
                setTotal(response.total);
                setTotalPages(response.pagination.totalPages);
                setCurrentPage(response.pagination.currentPage);
            } catch (e) {
                console.error(e);
            }
        }
        fetchData()
    }, [currentPage, name]);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleSearch = async () => {
        setCurrentPage(1);
        try {
            const token = localStorage.getItem('token');
            let params = {
                page: 1,
                name: name
            }
            const response = await getLogs(token, params);
            setLogs(response.logs);
            setTotal(response.total);
            setTotalPages(response.pagination.totalPages);
            setCurrentPage(response.pagination.currentPage);
        } catch (e) {
            console.error(e);
        }
    }

    function handleSearchTermChange(e) {
        const value = e.target.value;
        setNameSearch(value);

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        };

        typingTimeoutRef.current = setTimeout(() => {
            setName(value);
        }, 2000);
    }

    return (
        <PrivateRoute>
            <Layout>
                <div className="content-logs">
                    <div className="header-logs">
                        <h4>Action Logs</h4>
                        <div className="section-search">
                            <input type="text" className="search" placeholder="Search by device name" value={nameSearch} onChange={handleSearchTermChange} />
                            <button type="button" className="btn-search" onClick={handleSearch} >Search</button>
                        </div>
                    </div>
                    {logs.length === 0 ?
                        <div>No logs found</div> :
                        <table id="logs">
                            <thead>
                                <tr>
                                    <th>Device ID</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody id="logs-list">
                                {logs.map(log => (
                                    <tr key={log.deviceID}>
                                        <td>{log.deviceID}</td>
                                        <td>{log.name}</td>
                                        <td>{log.action}</td>
                                        <td>{log.date}</td>
                                    </tr>
                                ))}

                                <tr className="total">
                                    <th>Total</th>
                                    <th></th>
                                    <th></th>
                                    <th>{total}</th>
                                </tr>
                            </tbody>
                        </table>
                    }
                    <div className="pagination">
                        <button className="prev-btn" onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button className={`page-btn ${page === currentPage ? 'act' : ''}`} key={page} onClick={() => setCurrentPage(page)}>{page}</button>
                        ))}
                        <button className="prev-btn" onClick={handleNextPage} disabled={currentPage === totalPages}>Next </button>
                    </div>
                </div>
            </Layout>
        </PrivateRoute>
    );
}

export default Logs;
