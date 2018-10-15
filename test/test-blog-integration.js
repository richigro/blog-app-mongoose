'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const expect = chai.expect;

const {BlogPost} = require('../models');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

function seedBlogData() {
    console.info('Seeding blog data');
    const seedData = [];

    for(let i =0; i <= 10; i++) {
        seedData.push(generateBlogData());
    }
    return BlogPost.insertMany(seedData);
}



function generateRandomTitle() {
    const title = ['The end', 'The begining', 'The middle', 'The Post'];
    return title[Math.floor(Math.random() * title.length)];
}


function generateRandomContent() {
    const content = ['ffFFFA', 'ADfFFGGSE', 'Fgagfw', 'DsAd'];
    return content[Math.floor(Math.random() * content.length)];
}


function generateBlogData() {
    return {
        author: faker.name.firstName(),
        content: generateRandomContent(),
        title: generateRandomTitle(),
        created: Date.now()
    };
}

function tearDownDb() {
    console.warn('Deleting test Database');
    return mongoose.connection.dropDatabase();
}

describe('Blog API resource', function() {
    before(function() {
        return runServer(TEST_DATABASE_URL);
    });
    beforeEach(function() {
        return seedBlogData();
    });

    afterEach(function() {
        return tearDownDb();
    });
    after(function() {
        return closeServer();
    });

    describe('GET endpoint', function() {
        it('should return all existing blogs', function() {
            let res; 
            return chai.request(app)
            .get('/blogs')
            .then(function(_res) {
                res = _res;
                expect(res).to.have.status(200);
                expect(res.body.blogs).to.have.lengthOf.at.least(1);
                return BlogPost.count();
            })
            .then(function(count) {
                expect(res.body.blogs).to.have.lengthOf(count);
            });
        });

    });
});