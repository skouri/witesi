import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';
import Contract from '../src/components/Contract';

storiesOf('Button', module)
  .add('with text', () => (
    <Button>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
  )); 

storiesOf('Contract', module)
    .add('Item Exchange', () => {
        let details = {
            "collateral": 0,
            "contract_id": 141767368,
            "date_expired": "2019-02-21T20:55:27Z",
            "date_issued": "2019-01-24T20:55:27Z",
            "days_to_complete": 0,
            "end_location_id": 60013867,
            "issuer_corporation_id": 98538213,
            "issuer_id": 1069172314,
            "price": 150000000,
            "reward": 0,
            "start_location_id": 60013867,
            "title": "entosis prophecy",
            "type": "item_exchange",
            "volume": 234000
          };
        return (
            <Contract details={details} type='item_exchange'></Contract>
        )
    })
    .add('Auction', () => (
        <Contract></Contract>
    ))
    .add('Courier', () => {
        let details = {
            "collateral": 7500000,
            "contract_id": 142403471,
            "date_expired": "2019-03-11T06:19:21Z",
            "date_issued": "2019-02-11T06:19:21Z",
            "days_to_complete": 10,
            "end_location_id": 60004588,
            "issuer_corporation_id": 98484787,
            "issuer_id": 92235506,
            "price": 0,
            "reward": 750000,
            "start_location_id": 60013867,
            "title": "",
            "type": "courier",
            "volume": 115000
          };
        return (
            <Contract details={details} type='courier'></Contract>
        )
    })