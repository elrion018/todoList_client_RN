export let ADDRESS;

if (__DEV__) {
  ADDRESS = 'http://35.194.105.204:8000';
} else {
  ADDRESS = 'http://35.194.105.204:8000';
}

//register

export const URL_POST_REGISTER_ID = `${ADDRESS}/sign/signup`; // 회원가입

//login

export const URL_POST_LOGIN_ID = `${ADDRESS}/sign/signin`;

//check token

export const URL_POST_CHECK_TOKEN = `${ADDRESS}/sign/token-check`;

//project

export const URL_GET_PROJECT_LIST = `${ADDRESS}/todo/project`; // project list 가져오기
export const URL_POST_PROJECT_LIST_EMAIL = `${ADDRESS}/todo/project/email`;
export const URL_POST_PROJECT_LIST = `${ADDRESS}/todo/project`; // 새로운 project 만들기
export const URL_PUT_PROJECT_LIST = (slug) => `${ADDRESS}/todo/project/${slug}`; // 기존 project 수정하기

//todo

export const URL_GET_TODO_LIST = `${ADDRESS}/todo/todo`; // todolist 가져오기
export const URL_POST_TODO_LIST_EMAIL = `${ADDRESS}/todo/todo/email`;
export const URL_POST_TODO_LIST = `${ADDRESS}/todo/todo`; //새로운 todo 만들기
export const URL_PUT_TODO_DETAIL = (slug) => `${ADDRESS}/todo/todo/${slug}`; //기존 todo 수정하기

//subtodo

export const URL_GET_SUBTODO_LIST = `${ADDRESS}/todo/subtodo`; // subtodolist 가져오기
export const URL_POST_SUBTODO_LIST_EMAIL = `${ADDRESS}/todo/subtodo/email`;
export const URL_POST_SUBTODO_LIST = `${ADDRESS}/todo/subtodo`; //새로운 subtodo 만들기
export const URL_PUT_SUBTODO_DETAIL = (slug) =>
  `${ADDRESS}/todo/subtodo/${slug}`; // 기존 subtodo 수정하기
