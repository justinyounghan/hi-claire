import axios from 'axios';
import { setToken } from '../helpers/VerifyToken';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(__dirname, '.env') });

const SET_USER = 'AUTH/SET_USER';
const LOGOUT_USER = 'AUTH/LOGOUT_USER';
const CREATE_USER = 'AUTH/CREATE_USER';
const SEND_RESET_LINK = 'AUTH/SEND_RESET_LINK';
const RESET_VALID = 'AUTH/RESET_VALID';
const UPDATE_PASSWORD = 'AUTH/UPDATE_PASSWORD';
const VALIDATE_TOKEN = 'AUTH/VALIDATE_TOKEN';
const GET_TODOS = 'TODO/GET_TODOS';
const ADD_TODO = 'TODO/ADD_TODO';
const REMOVE_TODO = 'TODO/REMOVE_TODO';
const FETCH_NEWS = 'NEWS/FETCH_NEWS';
const FETCH_TWITTER_PERSONA_INSIGHT = 'PERSONA/FETCH_TWITTER_PERSONA_INSIGHT';
const FETCH_AMAZON_PERSONA_INSIGHT = 'PERSONA/FETCH_AMAZON_PERSONA_INSIGHT';
const FETCH_AMAZON_PERSONA_RESULTS = 'PERSONA/FETCH_AMAZON_PERSONA_RESULTS';

const initialState = {
  authenticated: false,
  todos: [],
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        authenticated: action.payload.auth,
        id: action.payload.id,
        email: action.payload.email,
        login: action.payload.err,
        todos: action.payload.todos
      };

    case LOGOUT_USER:
      return initialState;

    case CREATE_USER:
      return {
        ...state,
        authenticated: action.payload.auth,
        id: action.payload.id,
        email: action.payload.email,
        register: action.payload.err,
        todos: action.payload.todos
      };

    case SEND_RESET_LINK:
      return { ...state, message: action.payload };

    case RESET_VALID:
      return { ...state };

    case VALIDATE_TOKEN:
      return { ...state, valid: action.payload };

    case UPDATE_PASSWORD:
      return { ...state, message: action.payload };

    case ADD_TODO:
      return { ...state, todos: action.payload };

    case GET_TODOS:
      return { ...state, todos: action.payload };

    case REMOVE_TODO:
      return { ...state, todos: action.payload };

    case FETCH_NEWS:
      return { ...state, news: action.payload };

    case FETCH_TWITTER_PERSONA_INSIGHT:
      return { ...state, twitter: action.payload };

    case FETCH_AMAZON_PERSONA_INSIGHT:
      return { ...state, amazon_request: action.payload, loading: true };

    case FETCH_AMAZON_PERSONA_RESULTS:
      return { ...state, amazon: action.payload, loading: action.loading };

    default:
      return state;
  }
};

export const setUser = id => {
  return dispatch => {
    return axios.get('/currentuser').then(res => {
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    });
  };
};

export const login = params => {
  return dispatch => {
    return axios.post('/login', params).then(res => {
      const token = res.data.token;
      if (token) {
        localStorage.setItem('jwtToken', token);
        setToken(token);
        jwt.decode(token);
      }
      dispatch({
        type: SET_USER,
        payload: res.data
      });
    });
  };
};

export const register = params => {
  return dispatch => {
    return axios.post(`/register`, params).then(res => {
      const token = res.data.token;
      if (token) {
        localStorage.setItem('jwtToken', token);
        setToken(token);
      }
      dispatch({
        type: CREATE_USER,
        payload: res.data
      });
    });
  };
};

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    setToken(false);
    dispatch({ type: LOGOUT_USER });
  };
};

export const sendResetLink = params => {
  return dispatch => {
    return axios.post('/send-reset-link', params).then(res => {
      dispatch({
        type: SEND_RESET_LINK,
        payload: res.data
      });
    });
  };
};

export const validateToken = params => {
  return dispatch => {
    return axios.get('/validate-token', { params }).then(res => {
      dispatch({
        type: VALIDATE_TOKEN,
        payload: res.data
      });
    });
  };
};

export const resetPassword = params => {
  return dispatch => {
    return axios.put('/reset-password', params).then(res => {
      dispatch({
        type: UPDATE_PASSWORD,
        payload: res.data
      });
    });
  };
};

export const getTodos = params => {
  return async dispatch => {
    const res = await axios.get('/todo', params);
    return dispatch({
      type: GET_TODOS,
      payload: res.data
    });
  };
};

export const addTodo = params => {
  return async dispatch => {
    const res = await axios.put('/todo', { params });
    return dispatch({
      type: ADD_TODO,
      payload: res.data
    });
  };
};

export const deleteTodo = params => {
  return async dispatch => {
    const res = await axios.put('/remove_todo', { params });

    return dispatch({
      type: REMOVE_TODO,
      payload: res.data
    });
  };
};

export const fetchNews = params => {
  return async dispatch => {
    const res = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=us&apiKey=e962d25a74b4496b902ac64002a1aa22`
    );

    return dispatch({
      type: FETCH_NEWS,
      payload: res.data
    });
  };
};

export const queryNews = params => {
  return async dispatch => {
    if (params.value) {
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=${
          params.value
        }&apiKey=e962d25a74b4496b902ac64002a1aa22`
      );
      return dispatch({
        type: FETCH_NEWS,
        payload: res.data
      });
    } else {
      const res = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&q=${
          params.value
        }&apiKey=e962d25a74b4496b902ac64002a1aa22`
      );
      return dispatch({
        type: FETCH_NEWS,
        payload: res.data
      });
    }
  };
};

export const analyzeTwitter = params => {
  return async dispatch => {
    const res = await axios.post('/analyze/twitter', params);
    return dispatch({
      type: FETCH_TWITTER_PERSONA_INSIGHT,
      payload: res.data
    });
  };
};

export const analyzeAmazon = params => {
  return async dispatch => {
    const res = await axios.post('/analyze/amazon', params);

    return dispatch({
      type: FETCH_AMAZON_PERSONA_INSIGHT,
      payload: res.data
    });
  };
};

export const fetchAmazonResults = params => {
  return async dispatch => {
    const doSetTimeout = i => {
      setTimeout(async () => {
        const res = await axios.get('/analyze/amazon/results', { params });

        dispatch({
          type: FETCH_AMAZON_PERSONA_RESULTS,
          payload: res.data,
          loading: i < 3 ? true : false
        });
      }, 22000 * (i + 1));
    };

    for (var i = 1; i <= 3; ++i) {
      doSetTimeout(i);
    }
  };
};
