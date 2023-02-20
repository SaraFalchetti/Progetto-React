import React, { useEffect, useState } from "react";
import useHttp from "../hook/use-http";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../posts/Posts.css';
import Pagination from "../tabella-dati/Pagination";
import Filtro from "../filtro/Filtro";

const Posts = () => {
    const [dati, setDati] = useState([]);
    const [value, setValue] = useState("");

    const [postsPerPage, setPostPerPage] = useState(10);

    //let postsPerPage = 10; //quanti post voglio per pagina  
    const totalPosts = 100;

    const postsData = data => {
        const posts_array = data.map(
            postsData => {
                return {
                    id: postsData.id,
                    title: postsData.title,
                    body: postsData.body,
                }
            });
        setDati(posts_array)
    }

    const { sendRequest: fetchPosts } = useHttp();

    useEffect(() => {
        fetchPosts({ url: `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=10` }, postsData);
    }, []);


    const paginate = (pageNumber) => {
        fetchPosts({ url: `https://jsonplaceholder.typicode.com/posts?_page=${pageNumber}&_limit=10` }, postsData);

    };

    const changeSearchValue = (e) => {
        setValue(e.target.value)
    };

    const handleSearchValue = (e) => {
        e.preventDefault();
        return fetchPosts({ url: `https://jsonplaceholder.typicode.com/posts?title=${value}` }, postsData);
    };

    /*    const handleChange=(e)=>{    
           
           console.log(e.target.value); 
          setPostPerPage(e.target.value);
           
           console.log(postsPerPage); 
           fetchPosts({ url: `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=${postsPerPage}` }, postsData);  
     
       }; 
       
       
        const handleChange=(e)=>{
             console.log(e.target.value); 
             let postPerPag=e.target.value;
         
           fetchPosts({ url: `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=${postPerPag}` }, postsData); */

    useEffect(() => {
        fetchPosts({ url: `https://jsonplaceholder.typicode.com/posts?_page=1&_limit=${postsPerPage}` }, postsData);
    }, [postsPerPage]);

    return (
        <>
            <div className='row'>
                <div className='col-12 mt-2 mx-3 p-1 '><h1>Post degli utenti</h1></div>
            </div>
            <div className="row">
                <div className="col-3">
                    <Filtro title={"Ricerca"}>
                        <div className="col-sm-6 p-1 input-group">
                            <input type="text" className="form-control mr-sm-2" id="InputSearch" placeholder="Search" aria-label="Search"
                                value={value}
                                onChange={changeSearchValue}
                            />
                            <button type="button" className="btn btn-outline-success"
                                onClick={handleSearchValue}>
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </Filtro>
                </div>
                <div className="row">
                    <div className="col-2 p-2">
                        <select className="form-select" aria-label="Default select example"
                            //onChange={handleChange} 
                            onChange={(e) => setPostPerPage(e.target.value)}
                        >
                            <option>Risultati per pagina</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className='row'>
                <div className='col-sm-12 col-md-10 col-lg-8'>
                    <div className="table-responsive">
                        <table className="table">
                            <thead className='sfondo'>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Body</th>

                                </tr>
                            </thead>
                            <tbody>
                                {dati.map((post) =>
                                    <tr key={post.id}>
                                        <th scope="row">{post.id}</th>
                                        <td>{post.title}</td>
                                        <td>{post.body}</td>

                                    </tr>
                                )}

                            </tbody>
                        </table>
                        <Pagination contattiPerPage={postsPerPage}
                            totalContatti={totalPosts}
                            paginate={paginate}

                        />
                    </div>
                </div>
            </div>
        </>
    )
};
export default Posts;