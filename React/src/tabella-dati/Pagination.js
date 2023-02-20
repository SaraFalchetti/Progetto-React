import React from "react";

const Pagination = ({ contattiPerPage, totalContatti, paginate }) => {

    const numeroPagine = [];

    for (let i = 1; i <= Math.ceil(totalContatti / contattiPerPage); i++) {
        numeroPagine.push(i);
    }

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
            
                {numeroPagine.map(number => (
                    <li key={number} className="page-item">  
                        <a
                            onClick={() => paginate(number)}
                            className="page-link" href="#">{number}
                        </a>
                    </li>
                ))}
            
            </ul>
        </nav>
    )

}

export default Pagination;