const mongoose = require('mongoose');
const User = require('../model/user');

const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');

chai.use(chaiHttp);

describe('Users', () => {
	beforeEach((done) => {
		User.remove({}, (err) => {
			done();
		});
	});
});

describe('POST /users/register', () => {
	it('it should have username', (done) => {
		let user = {
			email: 'test@test.kz',
			firstName: 'Ivan',
			lastName: 'Petrov',
			password: 'testtest',
		};
		chai
			.request(server)
			.post('/api/auth/register')
			.send(user)
			.end((err, res) => {
				res.body.should.have.status('error');
				res.body.should.have.property('error').eql('Invalid username');
				done();
			});
	});
	it('it should have email', (done) => {
		let user = {
			username: 'testNickname',
			firstName: 'Ivan',
			lastName: 'Petrov',
			password: 'testtest',
		};
		chai
			.request(server)
			.post('/api/auth/register')
			.send(user)
			.end((err, res) => {
				res.body.should.have.status('error');
				res.body.should.have.property('error').eql('Please enter your email');
				done();
			});
	});
	it('Email should have proper validation', (done) => {
		let user = {
			username: 'testNickname',
			email: 'ddd',
			firstName: 'Ivan',
			lastName: 'Petrov',
			password: 'testtest',
		};
		let user2 = {
			username: 'testNickname',
			email: 'ddd@',
			firstName: 'Ivan',
			lastName: 'Petrov',
			password: 'testtest',
		};
		let user3 = {
			username: 'testNickname',
			email: 'ddd@dd',
			firstName: 'Ivan',
			lastName: 'Petrov',
			password: 'testtest',
		};
		chai
			.request(server)
			.post('/api/auth/register')
			.send(user)
			.send(user2)
			.send(user3)
			.end((err, res) => {
				res.body.should.have.status('error');
				res.body.should.have.property('error').eql('Please enter your email');
				done();
			});
	});
	it('it should have first name', (done) => {
		let user = {
			username: 'testNickname',
			email: 'test@test.ru',
			lastName: 'Petrov',
			password: 'testtest',
		};
		chai
			.request(server)
			.post('/api/auth/register')
			.send(user)
			.end((err, res) => {
				res.body.should.have.status('error');
				res.body.should.have
					.property('error')
					.eql('Please enter your first name');
				done();
			});
	});
	it('it should have last name', (done) => {
		let user = {
			username: 'testNickname',
			email: 'test@test.ru',
			firstName: 'Ivan',
			password: 'testtest',
		};
		chai
			.request(server)
			.post('/api/auth/register')
			.send(user)
			.end((err, res) => {
				res.body.should.have.status('error');
				res.body.should.have
					.property('error')
					.eql('Please enter your last name');
				done();
			});
	});
	it('it should have password', (done) => {
		let user = {
			username: 'testNickname',
			email: 'test@test.ru',
			firstName: 'Ivan',
			lastName: 'Petrov',
		};
		chai
			.request(server)
			.post('/api/auth/register')
			.send(user)
			.end((err, res) => {
				res.body.should.have.status('error');
				res.body.should.have.property('error').eql('Invalid password');
				done();
			});
	});
	it('it should have proper password', (done) => {
		let user = {
			username: 'testNickname',
			email: 'test@test.ru',
			firstName: 'Ivan',
			lastName: 'Petrov',
			password: '1',
		};
		let user1 = {
			username: 'testNickname',
			email: 'test@test.ru',
			firstName: 'Ivan',
			lastName: 'Petrov',
		};
		let user2 = {
			username: 'testNickname',
			email: 'test@test.ru',
			firstName: 'Ivan',
			lastName: 'Petrov',
			password: '!#!@',
		};
		let user3 = {
			username: 'testNickname',
			email: 'test@test.ru',
			firstName: 'Ivan',
			lastName: 'Petrov',
			password: 'ssss',
		};
		chai
			.request(server)
			.post('/api/auth/register')
			.send(user)
			.send(user1)
			.send(user2)
			.send(user3)
			.end((err, res) => {
				res.body.should.have.status('error');
				res.body.should.have
					.property('error')
					.eql('Password too small. Should be atleast 8 characters');
				done();
			});
	});
});
