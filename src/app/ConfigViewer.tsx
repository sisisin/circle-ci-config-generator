import React from 'react';
import { parse, toJsonGraph } from './parser';
import Graph from 'react-json-graph';

const config = parse(getSample());

export const ConfigViewer: React.FC = () => {
  const [json, setJson] = React.useState(toJsonGraph(config, 'test3'));
  return (
    <div>
      <Graph
        width={1600}
        height={600}
        json={json}
        onChange={(newGraphJSON: any) => {
          setJson(newGraphJSON);
        }}
        scale={1}
        // minScale={0.5}
        isVertical
        shouldNodeFitContent
      />
      <pre>{JSON.stringify(json, null, '  ')}</pre>
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
  test2:
    jobs:
      - build
      - acceptance_test_1:
          requires:
            - build
      - acceptance_test_2:
          requires:
            - build
      - acceptance_test_3:
          requires:
            - build
      - acceptance_test_4:
          requires:
            - build
      - deploy:
          requires:
            - acceptance_test_1
            - acceptance_test_2
            - acceptance_test_3
            - acceptance_test_4
  test3:
    jobs:
      - acceptance_test_1:
      - acceptance_test_2:
      - acceptance_test_3:
      - acceptance_test_4:
      - deploy:
          requires:
            - acceptance_test_1
            - acceptance_test_2
            - acceptance_test_3
            - acceptance_test_4

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
