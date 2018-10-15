'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const expect = chai.expect;

const {BlogPost} = require('./models');
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