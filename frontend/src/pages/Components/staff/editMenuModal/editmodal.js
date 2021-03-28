import React from "react";
import Modal from "react-modal";
import { useState, useEffect } from "react";
import "./editModal.css";
import { postMenu } from "../../../../util/staffApi";
import Monday from "./monday.png";
import Tuesday from "./tuesday.png";
import Wednesday from "./wednesday.png";
import Thursday from "./thursday.png";
import Friday from "./friday.png";
import Saturday from "./saturday.png";
import Sunday from "./sunday.png";
import { isAuthenticated, getMenu } from "./../../../../util/staffApi";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import NightsStayOutlinedIcon from "@material-ui/icons/NightsStayOutlined";
import FilterDramaOutlinedIcon from "@material-ui/icons/FilterDramaOutlined";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { TextField } from "@material-ui/core";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import SendIcon from "@material-ui/icons/Send";

import Button from "@material-ui/core/Button";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={7}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  indicator: {
    backgroundColor: "#4444",
  },
  multilineColor: {
    color: "white",
  },
}));

const EditModal = () => {
  const token = isAuthenticated() && isAuthenticated().stafftoken;
  const [menu, setMenu] = useState({
    selectedOption: "",
    data: "",
  });

  useEffect(async () => {
    try {
      let menuRes = await getMenu(token);
      setMenu({
        ...menu,
        data: menuRes,
      });
    } catch (err) {
      console.log(err);
    }
  }, [token]);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const openModal = () => {
    setMenu({
      ...menu,
      selectedOption: true,
    });
  };

  const closeModal = () => {
    setMenu({
      ...menu,
      selectedOption: false,
    });
    // reload();
  };

  const customStyles = {
    overlay: { zIndex: 1000 },
  };

  const datear = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // const reload = () => window.location.reload();

  const getDay = (index) => {
    if (index == 0) return Sunday;
    if (index == 1) return Monday;
    if (index == 2) return Tuesday;
    if (index == 3) return Wednesday;
    if (index == 4) return Thursday;
    if (index == 5) return Friday;
    if (index == 6) return Saturday;
  };

  return (
    <div className='staffbox2'>
      <button className='button-modal' onClick={openModal}>
        Edit Menu
      </button>
      <Modal
        style={customStyles}
        centred
        className='modal'
        isOpen={!!menu.selectedOption}
        contentLabel='Selected Option'
        onRequestClose={closeModal}
        ariaHideApp={true}
      >
        <div classname={classes.root}>
          <AppBar
            position='fixed'
            color='transparent'
            style={{
              width: "100%",
              borderRadius: "40px",
              top: "2%",
              boxShadow: "none",
              left: "0.5%",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant='scrollable'
              scrollButtons='on'
              classes={{
                indicator: classes.indicator,
              }}
              aria-label='scrollable force tabs example'
            >
              {datear.map((day, index) => (
                <Tab
                  style={{ minWidth: "14%", position: "sticky" }}
                  icon={
                    <img
                      alt='test avatar'
                      src={getDay(index)}
                      className={classes.small}
                    ></img>
                  }
                  aria-label={day}
                  {...a11yProps(index)}
                />
              ))}
            </Tabs>
          </AppBar>
          {datear.map((day, index) => (
            <TabPanel
              className='tabpanel'
              value={value}
              index={index}
              spellcheck='false'
            >
              <div className='box_grid'>
                <div className='floatr'>
                  <div className='menu__mealname '>
                    <span className='headingMeal'>Breakfast </span>
                    <FilterDramaOutlinedIcon className='icon' />{" "}
                  </div>
                  <div className='menu_card'>
                    <span>Main course</span>
                    <form className='form' noValidate autoComplete='off'>
                      <TextField
                        className='textfield'
                        value={
                          menu.data?.completeMeal?.[day.toLowerCase()]
                            ?.breakfast.foodItem.length
                            ? menu.data.completeMeal[day.toLowerCase()]
                                .breakfast.foodItem
                            : ""
                        }
                        InputProps={{
                          className: classes.multilineColor,
                        }}
                        id='standard-multiline-flexible'
                        multiline
                        rowsMax={4}
                        onChange={(e) => {
                          setMenu({
                            ...menu,
                            data: {
                              completeMeal: {
                                ...menu.data.completeMeal,
                                [day.toLowerCase()]: {
                                  ...menu.data.completeMeal[day.toLowerCase()],
                                  breakfast: {
                                    ...menu.data.completeMeal[day.toLowerCase()]
                                      .breakfast,
                                    foodItem: e.target.value,
                                  },
                                },
                              },
                            },
                          });
                        }}
                      />
                    </form>
                    <Button
                      variant='contained'
                      style={{ background: "transparent", color: "white" }}
                      className='button-meal style-button'
                      endIcon={<SendIcon />}
                      onClick={async (e) => {
                        let menuRes = {
                          day: day.toLowerCase(),
                          meal: "breakfast",
                          foodItem:
                            menu.data.completeMeal[day.toLowerCase()].breakfast
                              .foodItem,
                          desert:
                            menu.data.completeMeal[day.toLowerCase()].breakfast
                              .desert,
                        };
                        await postMenu(token, menuRes);
                        alert("Menu Updated");
                      }}
                    ></Button>
                  </div>
                  <div className='menu_card'>
                    <span>Dessert</span>
                    <form className='form' noValidate autoComplete='off'>
                      <TextField
                        className='textfield'
                        value={
                          menu.data?.completeMeal?.[day.toLowerCase()]
                            ?.breakfast.desert.length
                            ? menu.data.completeMeal[day.toLowerCase()]
                                .breakfast.desert
                            : ""
                        }
                        InputProps={{
                          className: classes.multilineColor,
                        }}
                        id='standard-multiline-flexible'
                        multiline
                        rowsMax={4}
                        onChange={(e) => {
                          setMenu({
                            ...menu,
                            data: {
                              completeMeal: {
                                ...menu.data.completeMeal,
                                [day.toLowerCase()]: {
                                  ...menu.data.completeMeal[day.toLowerCase()],
                                  breakfast: {
                                    ...menu.data.completeMeal[day.toLowerCase()]
                                      .breakfast,
                                    desert: e.target.value,
                                  },
                                },
                              },
                            },
                          });
                        }}
                      />
                    </form>
                    <Button
                      style={{ background: "transparent", color: "white" }}
                      variant='contained'
                      className='button-meal style-button'
                      endIcon={<SendIcon />}
                      onClick={async (e) => {
                        let menuRes = {
                          day: day.toLowerCase(),
                          meal: "breakfast",
                          foodItem:
                            menu.data.completeMeal[day.toLowerCase()].breakfast
                              .foodItem,
                          desert:
                            menu.data.completeMeal[day.toLowerCase()].breakfast
                              .desert,
                        };
                        await postMenu(token, menuRes);
                        alert("Menu Updated");
                      }}
                    ></Button>
                  </div>
                </div>
                <div className='floatr'>
                  <div className='menu__mealname'>
                    <span className='headingMeal'>Lunch</span>{" "}
                    <WbSunnyOutlinedIcon className='icon' />{" "}
                  </div>
                  <div className='menu_card'>
                    <span>Main course</span>
                    <form className='form' noValidate autoComplete='off'>
                      <TextField
                        className='textfield'
                        value={
                          menu.data?.completeMeal?.[day.toLowerCase()]?.lunch
                            .foodItem.length
                            ? menu.data.completeMeal[day.toLowerCase()].lunch
                                .foodItem
                            : ""
                        }
                        InputProps={{
                          className: classes.multilineColor,
                        }}
                        id='standard-multiline-flexible'
                        multiline
                        rowsMax={4}
                        onChange={(e) => {
                          setMenu({
                            ...menu,
                            data: {
                              completeMeal: {
                                ...menu.data.completeMeal,
                                [day.toLowerCase()]: {
                                  ...menu.data.completeMeal[day.toLowerCase()],
                                  lunch: {
                                    ...menu.data.completeMeal[day.toLowerCase()]
                                      .lunch,
                                    foodItem: e.target.value,
                                  },
                                },
                              },
                            },
                          });
                        }}
                      />
                    </form>
                    <Button
                      style={{ background: "transparent", color: "white" }}
                      variant='contained'
                      className='button-meal style-button'
                      endIcon={<SendIcon />}
                      onClick={async (e) => {
                        let menuRes = {
                          day: day.toLowerCase(),
                          meal: "lunch",
                          foodItem:
                            menu.data.completeMeal[day.toLowerCase()].lunch
                              .foodItem,
                          desert:
                            menu.data.completeMeal[day.toLowerCase()].lunch
                              .desert,
                        };
                        await postMenu(token, menuRes);
                        alert("Menu Updated");
                      }}
                    ></Button>
                  </div>
                  <div className='menu_card'>
                    <span>Dessert</span>
                    <form className='form' noValidate autoComplete='off'>
                      <TextField
                        className='textfield'
                        value={
                          menu.data?.completeMeal?.[day.toLowerCase()]?.lunch
                            .desert.length
                            ? menu.data.completeMeal[day.toLowerCase()].lunch
                                .desert
                            : ""
                        }
                        InputProps={{
                          className: classes.multilineColor,
                        }}
                        id='standard-multiline-flexible'
                        multiline
                        rowsMax={4}
                        onChange={(e) => {
                          setMenu({
                            ...menu,
                            data: {
                              completeMeal: {
                                ...menu.data.completeMeal,
                                [day.toLowerCase()]: {
                                  ...menu.data.completeMeal[day.toLowerCase()],
                                  lunch: {
                                    ...menu.data.completeMeal[day.toLowerCase()]
                                      .lunch,
                                    desert: e.target.value,
                                  },
                                },
                              },
                            },
                          });
                        }}
                      />
                    </form>
                    <Button
                      style={{ background: "transparent", color: "white" }}
                      variant='contained'
                      className='button-meal style-button'
                      endIcon={<SendIcon />}
                      onClick={async (e) => {
                        let menuRes = {
                          day: day.toLowerCase(),
                          meal: "lunch",
                          foodItem:
                            menu.data.completeMeal[day.toLowerCase()].lunch
                              .foodItem,
                          desert:
                            menu.data.completeMeal[day.toLowerCase()].lunch
                              .desert,
                        };
                        await postMenu(token, menuRes);
                        alert("Menu Updated");
                      }}
                    ></Button>
                  </div>
                </div>
                <div className='floatr'>
                  <div className='menu__mealname'>
                    <span className='headingMeal'> Dinner</span>
                    <NightsStayOutlinedIcon className='icon icon--moon' />{" "}
                  </div>
                  <div className='menu_card'>
                    <span>Main course</span>
                    <form className='form' noValidate autoComplete='off'>
                      <TextField
                        className='textfield'
                        value={
                          menu.data?.completeMeal?.[day.toLowerCase()]?.dinner
                            .foodItem.length
                            ? menu.data.completeMeal[day.toLowerCase()].dinner
                                .foodItem
                            : ""
                        }
                        InputProps={{
                          className: classes.multilineColor,
                        }}
                        id='standard-multiline-flexible'
                        multiline
                        rowsMax={4}
                        onChange={(e) => {
                          setMenu({
                            ...menu,
                            data: {
                              completeMeal: {
                                ...menu.data.completeMeal,
                                [day.toLowerCase()]: {
                                  ...menu.data.completeMeal[day.toLowerCase()],
                                  dinner: {
                                    ...menu.data.completeMeal[day.toLowerCase()]
                                      .dinner,
                                    foodItem: e.target.value,
                                  },
                                },
                              },
                            },
                          });
                        }}
                      />
                    </form>
                    <Button
                      style={{ background: "transparent", color: "white" }}
                      variant='contained'
                      className='style-button button-meal'
                      endIcon={<SendIcon />}
                      onClick={async (e) => {
                        let menuRes = {
                          day: day.toLowerCase(),
                          meal: "dinner",
                          foodItem:
                            menu.data.completeMeal[day.toLowerCase()].dinner
                              .foodItem,
                          desert:
                            menu.data.completeMeal[day.toLowerCase()].dinner
                              .desert,
                        };
                        await postMenu(token, menuRes);
                        alert("Menu Updated");
                      }}
                    ></Button>
                  </div>
                  <div className='menu_card'>
                    <span>Dessert</span>
                    <form className='form' noValidate autoComplete='off'>
                      <TextField
                        className='textfield'
                        InputProps={{
                          className: classes.multilineColor,
                        }}
                        value={
                          menu.data?.completeMeal?.[day.toLowerCase()]?.dinner
                            .desert.length
                            ? menu.data.completeMeal[day.toLowerCase()].dinner
                                .desert
                            : ""
                        }
                        id='standard-multiline-flexible'
                        multiline
                        rowsMax={4}
                        onChange={(e) => {
                          setMenu({
                            ...menu,
                            data: {
                              completeMeal: {
                                ...menu.data.completeMeal,
                                [day.toLowerCase()]: {
                                  ...menu.data.completeMeal[day.toLowerCase()],
                                  dinner: {
                                    ...menu.data.completeMeal[day.toLowerCase()]
                                      .dinner,
                                    desert: e.target.value,
                                  },
                                },
                              },
                            },
                          });
                        }}
                      />
                    </form>
                    <Button
                      style={{ background: "transparent", color: "white" }}
                      variant='contained'
                      className='button-meal style-button'
                      endIcon={<SendIcon />}
                      onClick={async (e) => {
                        let menuRes = {
                          day: day.toLowerCase(),
                          meal: "dinner",
                          foodItem:
                            menu.data.completeMeal[day.toLowerCase()].dinner
                              .foodItem,
                          desert:
                            menu.data.completeMeal[day.toLowerCase()].dinner
                              .desert,
                        };
                        await postMenu(token, menuRes);
                        alert("Menu Updated");
                      }}
                    ></Button>
                  </div>
                </div>
              </div>
            </TabPanel>
          ))}
        </div>

        <button onClick={closeModal} className='modal-button'>
          Okay
        </button>
      </Modal>
    </div>
  );
};
export default EditModal;
