import React, { useState } from "react";
import Navbar from "../components/Navbar";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import PushPinIcon from "@mui/icons-material/PushPin";

import { Card, CardContent, makeStyles,  Fab, Button } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";


const useStyles = makeStyles((theme) => ({
  appBar: {
    marginBottom: theme.spacing(2),
  },
  mainContainer: {
    display: "flex",
    backgroundColor:"#A7B492"
  },
  rectangle2: {
    marginTop:"20px",
    marginBottom:"20px",
    width: 200,
    height: "80vh",
    background: "linear-gradient(20deg, #2E3192 7%, #00C8C8 100%)",
    borderRadius: "30px 30px 30px 30px",
    padding: theme.spacing(2),
  },
  contentContainer: {
    flex: 1,
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "row",  // Display cards in a row
    flexWrap: "wrap",
    alignItems: "flex-start",
    gap:"20px"
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  card: {
    display:"flex",
    marginBottom: theme.spacing(2),
    backgroundColor: "lightblue", // Default card color
    position: "relative",
    cursor: "pointer",
  },
  deleteIcon: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    cursor: "pointer",
  },
  cardEditable: {
    marginBottom: theme.spacing(2),
    backgroundColor: "lightblue", // Default card color
    position: "relative",
    cursor: "text",
  },
  content: {
    width: "100%",
    height:"100%",
    outline: "none",
    fontSize: "inherit",
    backgroundColor: "transparent",
    color: "inherit",
    border: "none",
    resize: "none",
    overflow: "hidden",
  },
  categoryButtons: {
    display: "flex",
    alignItems: "center",
    flexDirection:"column",
    gap:"30px",
    margin: theme.spacing(2, 0),
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: "20px",
  },
  pinIcon: {
    position: "absolute",
    top: theme.spacing(1),
    left: theme.spacing(1),
    cursor: "pointer",
  },

}));

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const Note = () => {
  const classes = useStyles();
  const [cards, setCards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const togglePin = (id) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, pinned: !card.pinned } : card
      )
    );
  };

  const addCard = () => {
    const newCard = {
      id: uuidv4(),
      content: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Write your note here ",
      color: getRandomColor(),
      pinned: false, // Add a pinned property to your card
    };
    setCards((prevCards) => [...prevCards, newCard]);
  };
 

  const deleteCard = (id) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== id));
  };
  const [editableCardId, setEditableCardId] = useState(null);

  const startEditing = (id) => {
    setEditableCardId(id);
  };


  const saveChanges = (id, newContent) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id ? { ...card, content: newContent } : card
        //card.id === id ? { ...card, content: newContent || "Write your note here" } : card
      )
    );
    setEditableCardId(null);
  };
  const filterCardsByCategory = (category) => {
    if (category === "all") {
      return cards;
    } else {
      return cards.filter((card) => card.category === category);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };


  return (
    <>
      <Navbar />
      <div className={classes.mainContainer}>
        <div className={classes.rectangle2}>
        <div className={classes.categoryButtons}>
          
            <Button
              variant={selectedCategory === "all" ? "contained" : "outlined"}
              onClick={() => handleCategoryChange("all")}
            >
              All Notes
            </Button>
            <Button
              variant={selectedCategory === "lecture" ? "contained" : "outlined"}
              onClick={() => handleCategoryChange("lecture")}
            >
              Lecture Notes
            </Button>
            <Button
              variant={selectedCategory === "todo" ? "contained" : "outlined"}
              onClick={() => handleCategoryChange("todo")}
            >
              To-Do Lists
            </Button>
          </div>
          <Fab color="primary" className={classes.fab} onClick={addCard}>
            <AddIcon />
          </Fab>
        </div>
        <div className={classes.contentContainer}>

          
      {cards.map((card) => (

        
            <Card
              key={card.id}
              className={editableCardId === card.id ? classes.cardEditable : classes.card}
              style={{ backgroundColor: card.color, width: '350px', height: '120px', marginBottom: '4px',position: "relative",  }}
              onClick={() => startEditing(card.id)}
            >
              

              <DeleteIcon
                className={classes.deleteIcon}
                onClick={() => deleteCard(card.id)}
              />
              <PushPinIcon
                className={classes.pinIcon}
                onClick={() => togglePin(card.id)}
                //style={{ position: "absolute", top: theme.spacing(1), left: theme.spacing(1), cursor: "pointer" }}
                style={{
                  color: card.pinned ? "yellow" : "inherit", position: "absolute"
                }}
              />
              <CardContent>
                <div
                  className={classes.content}
                  contentEditable={editableCardId === card.id}
                  //dangerouslySetInnerHTML={{ __html: card.content }}
                  dangerouslySetInnerHTML={{
                    __html: card.content.replace(/&nbsp;/g, '\u00a0'),
                  }}
                  onBlur={(e) => saveChanges(card.id, e.target.innerHTML)}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Note;
