/* eslint-disable no-underscore-dangle */
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import styles from './TableComponent.style';
import ReadMoreLessText from '../readMoreLessText/ReadMoreLessText';
import articlesService from '../../services/articles';

const TableComponent = ({ articles, setIsClicked, isClicked }) => {
  const { docs } = articles;
  const handleDeleteArticle = async (id) => {
    await articlesService.deleteArticle(id);
    setIsClicked(!isClicked);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              style={styles.tableHead}
            >
              Author
            </TableCell>
            <TableCell align="center" style={styles.tableHead}>Title</TableCell>
            <TableCell align="left" style={styles.tableHead}>Tags</TableCell>
            <TableCell align="center" style={styles.tableHead}>Comment Text</TableCell>
            <TableCell align="center" style={styles.tableHead}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {docs?.map((article) => (
            <TableRow
              key={article._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell width="5%">
                {article.author}
              </TableCell>
              <TableCell width="10%">{article.title}</TableCell>
              <TableCell width="10%">{article._tags.map((tag) => <p key={tag} style={styles.tag}>{tag}</p>)}</TableCell>
              <TableCell align="left" width="55%">
                <ReadMoreLessText>
                  {article.comment_text}
                </ReadMoreLessText>
              </TableCell>
              <TableCell width="10%">
                <Button color="error" variant="contained" onClick={() => handleDeleteArticle(article._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComponent;
