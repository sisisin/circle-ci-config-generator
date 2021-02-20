export function testAndDeploy(): string {
  return `
workflows:
  main:
    jobs:
      - test
      - deploy:
          filters:
            branches:
              only: master
          requires:
            - test
`;
}
export function multiTestAndDeploy() {
  return `
workflows:
  main:
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

`;
}

export function buildAndTestAndDeploy() {
  return `
workflows:
  main:
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
`;
}
