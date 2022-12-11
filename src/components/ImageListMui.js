import { useEffect, useState } from "react";
import axios from "../helpers/axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";

const ImageListMui = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    axios
      .get(`https://picsum.photos/v2/list/?page=${currentPage}&limit=6`)
      .then((data) => {
        setList([...list, ...data]);
        setLoading(false);
      });
  }, [currentPage]);


  const handleDialogOpen = (author, width, height) => () => {
    setInfo({ author, width, height });
    setIsDialogOpen(true);
  };

  const nextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Image information</DialogTitle>
        <div style={{ padding: "5px" }}>
          <p>Author: {info.author}</p>
          <p>Width: {info.width}</p>
          <p>Height: {info.height}</p>
        </div>
      </Dialog>
      <ImageList
        sx={{ width: 800, height: "100%", margin: "20px auto" }}
        cols={2}
      >
        {list.map(({ id, download_url, author, width, height }) => (
          <ImageListItem key={id}>
            <img alt={author}
              onClick={handleDialogOpen(author, width, height)}
              style={{ cursor: "pointer" }}
              src={`${download_url}?w=164&h=164&fit=crop&auto=format`}
              srcSet={`${download_url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={nextPage}
          variant="contained"
        >
          Show more
        </Button>
      </Box>
    </>
  );
};

export default ImageListMui;
