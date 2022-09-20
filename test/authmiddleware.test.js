const { isLoggedIn } = require('../src/layers/middlewares/auth.middleware');
jest.mock('jsonwebtoken');
import jwt from 'jsonwebtoken';

describe('isLoggedIn', () => {
    const res = {
        status: jest.fn(() => res),
        json: jest.fn()
    };
    const next = jest.fn();
    const token = 
    jwt.sign({user_id : '1',
    nickname : 'mun',
    email:'num@gmail.com',
    namw:'이름',
    phone:'01234567'
}, process.env.ACCESS_SECRET, {expiresIn : '1h'});

    test('로그인되어 있으면 isLoggedIn이 next를 호출해야 함', () => {
        const req = {
            headers : {authorization : token}
        };
        isLoggedIn(req, res, next);
        expect(next).toBeCalledTimes(1); //auth.middleware를 수정해도 왜 못불러올까?
    });
    
    test('로그인되어 있지 않으면 isLoggedIn이 에러를 응답해야 함', () => {
        const req = {
            headers : {
                authorization : token
            }
        };
        const error = {name : 'TokenInvalid'};
        jwt.verify.mockImplementation(() => {
            throw error;
        });
        isLoggedIn(req, res, next);
        expect(res.status).toBeCalledWith(400);        
        expect(res.json).toBeCalledWith({            
                message : "로그인 되어있지 않습니다.",            
        })
    });

    test('토큰이 유효하지 않다면 에러를 응답해야 함', () => {
        const req = {
            headers : {
                authorization : 
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2MzU4OTc2NSwiZXhwIjoxNjYzNTkzMzY1fQ.N4ZKgOZkNFURzd0k3h_uB1pOpbT68la5XG-8ek8ptm4"

            }
        };
        const error = {name : 'TokenInvalid'};
        jwt.verify.mockImplementation(() => {
            throw error;
        });
        isLoggedIn(req, res, next);       
        expect(res.status).toBeCalledWith(400);        
        expect(res.json).toBeCalledWith({            
                message : "토큰이 유효하지 않습니다." ,            
        })
    });

});