/* eslint-disable no-underscore-dangle */
import {
  Button,
  Container, Pagination, TextField, Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import TableComponent from '../../components/tableComponent/TableComponent';
import articlesService from '../../services/articles';
import './Home.css';

export default function Home() {
  const [articles, setArticles] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [tagTextField, setTagTextField] = useState('');
  const [filterForm, setfilterForm] = useState({
    author: '',
    title: '',
    _tags: [],
  });

  const handlePagination = (event, value) => {
    setPageIndex(value);
  };

  const handleSubmit = async () => {
    const response = await articlesService
      .getAllArticles(pageIndex, filterForm);

    const data = await response.json();

    setArticles(data);
    setPageIndex(1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setfilterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTags = () => {
    setfilterForm((prev) => ({
      ...prev,
      _tags: [...filterForm._tags, tagTextField],
    }));
    setTagTextField('');
  };
  const handleClearTags = () => {
    setfilterForm((prev) => ({
      ...prev,
      _tags: [],
    }));
    setTagTextField('');
  };

  useEffect(async () => {
    const { author, title, _tags } = filterForm;
    if (author || title || _tags.length > 0) {
      const response = await articlesService
        .getAllArticles(pageIndex, filterForm);
      const data = await response.json();
      setArticles(data);
      handlePagination(null, 1);
    } else {
      const response = await articlesService
        .getAllArticles(pageIndex, filterForm);

      const data = await response.json();

      setArticles(data);
    }
  }, [isClicked, pageIndex]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h2" align="center" marginTop={10} marginBottom={10}>
        Reign Challenge - Test the API
      </Typography>
      <div className="form">
        <form onSubmit={(e) => e.preventDefault()} className="filter">
          <TextField
            label="Author"
            variant="outlined"
            name="author"
            value={filterForm.author}
            onChange={handleChange}
          />
          <TextField
            label="Title"
            variant="outlined"
            name="title"
            value={filterForm.title}
            onChange={handleChange}
          />
          <div>
            <div className="tags-group">
              <div>
                <TextField
                  label="Tags"
                  variant="outlined"
                  name="_tags"
                  value={tagTextField}
                  onChange={(e) => setTagTextField(e.target.value)}
                  fullWidth
                />
                <div className="tags">
                  {filterForm._tags?.map((tag) => <div className="tag-item">{tag}</div>)}
                </div>
              </div>
              <div className="tags-buttons">
                <Button variant="outlined" color="success" onClick={handleAddTags} style={{ height: 52 }}>Add</Button>
                <Button variant="outlined" color="error" onClick={handleClearTags} style={{ height: 52 }}>Clear All</Button>
              </div>
            </div>

          </div>
        </form>
        <Button onClick={handleSubmit} variant="contained" size="large" style={{ height: 52, textAlign: 'right' }}>Search</Button>
      </div>
      <div className="table">
        <div className="pagination">
          <Pagination
            shape="rounded"
            size="large"
            count={articles.totalPages}
            page={pageIndex}
            onChange={handlePagination}
            variant="outlined"
          />
        </div>

        {articles?.totalDocs > 0
          ? <TableComponent articles={articles} setIsClicked={setIsClicked} isClicked={isClicked} />
          : <h1>Sorry, there are no results</h1>}

        <div className="pagination">
          <Pagination
            shape="rounded"
            size="large"
            count={articles.totalPages}
            page={pageIndex}
            onChange={handlePagination}
            variant="outlined"
          />
        </div>
      </div>
    </Container>
  );
}
