import { queryActivities } from '@/services/api';
const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

let timer = value => {
    if (value) {
        let str = '';
        let newArr = value.toString().split(' ');
        let id = month.indexOf(newArr[1]);
        if (newArr[1]) {
            str = `${newArr[3]}-${id + 1}-${newArr[2]} ${newArr[4]}`;
        }
        return str;
    }
};

export default {
    namespace: 'time',

    state: {
        time: timer(new Date()),
    },

    effects: {
        * changeTime(_, { put }) {
            yield put({
                type: 'changetime',
                payload: timer(new Date()),
            });
        },
    },
    reducers: {
        changetime(state, action) {
            return {
                ...state,
                time: action.payload,
            };
        },
    },
};