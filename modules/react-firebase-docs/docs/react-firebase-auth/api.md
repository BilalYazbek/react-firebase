---
title: React Firebase Auth API
sidebar_label: API
---

- [FirebaseAuthProvider Props](#firebaseauthprovider-props)
- [Firebase Auth Reference](#firebase-auth-reference)
- [FirebaseAuthConsumer](#firebaseauthconsumer)
- [authState](#authstate)
- [IfFirebaseAuthed](#iffirebaseauthed)
  - [authState](#authstate)
- [IfFirebaseAuthedAnd](#iffirebaseauthedand)
  - [authState](#authstate)
- [IfFirebaseAuthedOr](#iffirebaseauthedor)
  - [authState](#authstate)
- [IfFirebaseUnAuthed](#iffirebaseunauthed)
  - [authState](#authstate)

## FirebaseAuthProvider Props

| Name              | Type                                               | Required | Default |
| :---------------- | :------------------------------------------------- | :------- | :------ |
| firebase          | [firebase](https://www.npmjs.com/package/firebase) | yes      |         |
| authDomain        | string                                             | yes      |         |
| apiKey            | string                                             | yes      |         |
| databaseURL       | string                                             | yes      |         |
| projectId         | string                                             | yes      |         |
| messagingSenderId | string                                             | no       |         |
| storageBucket     | string                                             | no       |         |
| children          | React Node                                         | no       |         |
| render            | \(\) =&gt; ReactNode                               | no       |         |

## [Firebase Auth Reference](https://firebase.google.com/docs/auth/)

## FirebaseAuthConsumer

| Name     | Type                            | Required | Default |
| :------- | :------------------------------ | :------- | :------ |
| children | \({authState}\) =&gt; ReactNode | no       |         |
| render   | \({authState}\) =&gt; ReactNode | no       |         |

## authState

| Name       | Type                                                                       |
| :--------- | :------------------------------------------------------------------------- |
| isSignedIn | boolean                                                                    |
| providerId | string enum : `none` or `anonymous` or `google.com` or `facebook.com` .... |
| user       | `user` or `null`                                                           |

* isSignedIn: boolean
* providerId: 'none' \| 'anonymous' \| 'google.com' \| 'facebook.com' ....
* user: null \| user

## IfFirebaseAuthed

Only renders when a user is authenticated

| Name     | Type                            | Required | Default |
| :------- | :------------------------------ | :------- | :------ |
| children | \({authState}\) =&gt; ReactNode | no       |         |
| render   | \({authState}\) =&gt; ReactNode | no       |         |

### [authState](api.md#authstate)

## IfFirebaseAuthedAnd

Only renders when a user is authenticated AND when the filter function passed as prop returns true

| Name     | Type                            | Required | Default |
| :------- | :------------------------------ | :------- | :------ |
| children | \({authState}\) =&gt; ReactNode | no       |         |
| render   | \({authState}\) =&gt; ReactNode | no       |         |
| filter   | \(authState\) =&gt; boolean     |          |         |

### [authState](api.md#authstate)

## IfFirebaseAuthedOr

Only renders when a user is authenticated OR when the filter function passed as prop returns true

| Name     | Type                            | Required | Default |
| :------- | :------------------------------ | :------- | :------ |
| children | \({authState}\) =&gt; ReactNode | no       |         |
| render   | \({authState}\) =&gt; ReactNode | no       |         |
| filter   | \(authState\) =&gt; boolean     |          |         |

### [authState](api.md#authstate)

## IfFirebaseUnAuthed

Only renders when a user is unauthenticated

| Name     | Type                            | Required | Default |
| :------- | :------------------------------ | :------- | :------ |
| children | \({authState}\) =&gt; ReactNode | no       |         |
| render   | \({authState}\) =&gt; ReactNode | no       |         |

### [authState](api.md#authstate)

