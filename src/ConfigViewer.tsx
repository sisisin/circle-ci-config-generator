import React from 'react';
import { parse } from './parser';

const config = parse(getSample());

export const ConfigViewer: React.FC = () => {
  return (
    <div>
      <pre>{JSON.stringify(config, null, '  ')}</pre>
    </div>
  );
};

function getSample(): string {
  return `
version: 2.1
workflows:
  tests:
    jobs:
      - test
      - deploy:
          filters:
            branches:
              only: master
          requires:
            - test

commands:
  setup:
    steps:
      - checkout
      - restore_cache:
          keys:
            - key-v2-{{ .Branch }}-{{ checksum "yarn.lock" }}
            - key-v2-{{ .Branch }}
            - key-v2-master
            - key-v2-
      - run: yarn install
jobs:
  test:
    docker:
      - image: circleci/node:14.15.5
    steps:
      - checkout
      - setup
      - save_cache:
          paths:
            - node_modules/
          key: key-v2-{{ .Branch }}-{{ checksum "yarn.lock" }}
      - run: yarn test
  deploy:
    docker:
      - image: circleci/node:14.15.5
    steps:
      - add_ssh_keys:
          fingerprints:
            - 'fd:81:f7:f7:e7:ff:32:2e:4c:16:90:41:5b:8b:77:19'
      - setup
      - run: |
          git config user.email "azsisisin@gmail.com"
          git config user.name "sisisin"
      - run: yarn deploy
`;
}
