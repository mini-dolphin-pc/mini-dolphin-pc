import { queryActivities } from '@/services/api';
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let timer = (value) => {
    if (value) {
        let str = "";
        let newArr = value.toString().split(' ');
        let id = month.indexOf(newArr[1]);
        if (newArr[1]) {
            str = `${newArr[3]}-${id+1}-${newArr[2]} ${newArr[4]}`
        }
        return str;
    }
}

export default {
    namespace: 'beforeform',

    state: {
        list: [],
        time: timer(new Date())
    },

    effects: {
        * fetchList(_, { call, put }) {
            const response = yield call(queryActivities);
            yield put({
                type: 'saveList',
                payload: Array.isArray(response) ? response : [],
            });
        },
        * changeTime(_, { put }) {
            console.log(timer(new Date()))
            yield put({
                type: 'changetime',
                payload: timer(new Date())
            })
        },

        reducers: {
            saveList(state, action) {
                return {
                    ...state,
                    list: action.payload,
                };
            },
            changetime(state, action) {
                console.log(action)
                return {
                    ...state,
                    time: action.payload
                }
            }
        },
    }
};