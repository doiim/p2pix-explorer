import { gql } from '@apollo/client';

// GraphQL fragments for common fields

export const FRAGMENT_DEPOSIT_ADDED = gql`
  fragment DepositAddedFragment on DepositAdded {
    id
    seller
    token
    amount
    blockNumber
    blockTimestamp
    transactionHash
  }
`;

export const FRAGMENT_DEPOSIT_WITHDRAWN = gql`
  fragment DepositWithdrawnFragment on DepositWithdrawn {
    id
    seller
    token
    amount
    blockNumber
    blockTimestamp
    transactionHash
  }
`;

export const FRAGMENT_LOCK_ADDED = gql`
  fragment LockAddedFragment on LockAdded {
    id
    buyer
    lockID
    seller
    amount
    blockNumber
    blockTimestamp
    transactionHash
  }
`;

export const FRAGMENT_LOCK_RELEASED = gql`
  fragment LockReleasedFragment on LockReleased {
    id
    buyer
    lockId
    amount
    blockNumber
    blockTimestamp
    transactionHash
  }
`;

export const FRAGMENT_LOCK_RETURNED = gql`
  fragment LockReturnedFragment on LockReturned {
    id
    buyer
    lockId
    blockNumber
    blockTimestamp
    transactionHash
  }
`;


// Combined activity query
export const GET_ALL_ACTIVITY = gql`
  ${FRAGMENT_DEPOSIT_ADDED}
  ${FRAGMENT_DEPOSIT_WITHDRAWN}
  ${FRAGMENT_LOCK_ADDED}
  ${FRAGMENT_LOCK_RELEASED}
  ${FRAGMENT_LOCK_RETURNED}
  query GetAllActivity($first: Int = 50) {
    depositAddeds(first: $first, orderBy: "blockTimestamp", orderDirection: "desc") {
      ...DepositAddedFragment
    }
    depositWithdrawns(first: $first, orderBy: "blockTimestamp", orderDirection: "desc") {
      ...DepositWithdrawnFragment
    }
    lockAddeds(first: $first, orderBy: "blockTimestamp", orderDirection: "desc") {
      ...LockAddedFragment
    }
    lockReleaseds(first: $first, orderBy: "blockTimestamp", orderDirection: "desc") {
      ...LockReleasedFragment
    }
    lockReturneds(first: $first, orderBy: "blockTimestamp", orderDirection: "desc") {
      ...LockReturnedFragment
    }
  }
`;


// Query for specific user activity
export const GET_USER_ACTIVITY = gql`
  ${FRAGMENT_DEPOSIT_ADDED}
  ${FRAGMENT_DEPOSIT_WITHDRAWN}
  ${FRAGMENT_LOCK_ADDED}
  ${FRAGMENT_LOCK_RELEASED}
  ${FRAGMENT_LOCK_RETURNED}
  query GetUserActivity($userAddress: String!, $first: Int = 50) {
    depositAddeds(first: $first, where: { seller: $userAddress }, orderBy: "blockTimestamp", orderDirection: "desc") {
      ...DepositAddedFragment
    }
    depositWithdrawns(first: $first, where: { seller: $userAddress }, orderBy: "blockTimestamp", orderDirection: "desc") {
      ...DepositWithdrawnFragment
    }
    lockAddeds(first: $first, where: { buyer: $userAddress }, orderBy: "blockTimestamp", orderDirection: "desc") {
      ...LockAddedFragment
    }
    lockReleaseds(first: $first, where: { buyer: $userAddress }, orderBy: "blockTimestamp", orderDirection: "desc") {
      ...LockReleasedFragment
    }
    lockReturneds(first: $first, where: { buyer: $userAddress }, orderBy: "blockTimestamp", orderDirection: "desc") {
      ...LockReturnedFragment
    }
  }
`;
