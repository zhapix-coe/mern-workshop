import React from 'react';
import renderer from 'react-test-renderer';
import { SnapshotComp } from '../../src/components/snapshot';

describe('snapshot testing to validate changes in file', () => {

    test('validate Snapshot for a component', () => {
        const reactTree = renderer.create(<SnapshotComp />).toJSON();
        expect(reactTree).toMatchSnapshot();
    })

    test('validate InlineSnapshot for a component', () => {
        const reactTree = renderer.create(<SnapshotComp />).toJSON();
        expect(reactTree).toMatchInlineSnapshot(`
<div>
  <h1>
    Hello from Snapshot
  </h1>
</div>
`);

    });

    test('validate Property Matchers for dynamically changing values', () => {
        const user = {
            createdAt: new Date(),
            id: Math.floor(Math.random() * 20),
            name: 'LeBron James',
        };

        expect(user).toMatchSnapshot({
            createdAt: expect.any(Date),
            id: expect.any(Number),
        });
    });
})





