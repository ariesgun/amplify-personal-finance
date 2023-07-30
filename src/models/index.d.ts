import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerAccount = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Account, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly bank?: string | null;
  readonly accountNum?: string | null;
  readonly logo?: string | null;
  readonly requisitionId?: string | null;
  readonly status?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAccount = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Account, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly bank?: string | null;
  readonly accountNum?: string | null;
  readonly logo?: string | null;
  readonly requisitionId?: string | null;
  readonly status?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Account = LazyLoading extends LazyLoadingDisabled ? EagerAccount : LazyAccount

export declare const Account: (new (init: ModelInit<Account>) => Account) & {
  copyOf(source: Account, mutator: (draft: MutableModel<Account>) => MutableModel<Account> | void): Account;
}

type EagerRecord = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Record, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly category?: string | null;
  readonly amount?: number | null;
  readonly transactionDate?: string | null;
  readonly currency?: string | null;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyRecord = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Record, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly category?: string | null;
  readonly amount?: number | null;
  readonly transactionDate?: string | null;
  readonly currency?: string | null;
  readonly description?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Record = LazyLoading extends LazyLoadingDisabled ? EagerRecord : LazyRecord

export declare const Record: (new (init: ModelInit<Record>) => Record) & {
  copyOf(source: Record, mutator: (draft: MutableModel<Record>) => MutableModel<Record> | void): Record;
}