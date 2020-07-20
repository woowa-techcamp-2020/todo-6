// import supertest, { Response, SuperTest, Test } from 'supertest';
// import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';
//
//
// import app from '@server';
// import UserDao from '@daos/User/UserDao.mock';
// import User, { IUser } from '@entities/User';
// import { pErr } from '@shared/functions';
// import { paramMissingError } from '@shared/constants';
//
//
// describe('Users Routes', () => {
//     const cardsPath = '/api/users/1/lists/2/cards';
//
//
//     let agent: SuperTest<Test>;
//
//     beforeAll((done) => {
//         agent = supertest.agent(app);
//         done();
//     });
//
//     describe(`"POST:${cardsPath}"`, () => {
//         const callApi = (reqBody: object) => agent.post(cardsPath).type('form').send(reqBody);
//
//         // const cardData = {
//         //     user: new User('Gordan Freeman', 'gordan.freeman@gmail.com'),
//         // };
//         //
//         // it(`should return a status code of "${CREATED}" if the request was successful.`, (done) => {
//         //     spyOn(UserDao.prototype, 'add').and.returnValue(Promise.resolve());
//         //
//         //     agent.post(addUsersPath).type('form').send(userData) // pick up here
//         //         .end((err: Error, res: Response) => {
//         //             pErr(err);
//         //             expect(res.status).toBe(CREATED);
//         //             expect(res.body.error).toBeUndefined();
//         //             done();
//         //         });
//         // });
//     });
// });
