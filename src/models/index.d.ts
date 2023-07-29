import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerSessionNordigen = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SessionNordigen, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly createdAt?: string | null;
  readonly institutionId?: string | null;
  readonly agreement?: string | null;
  readonly reference?: string | null;
  readonly link?: string | null;
  readonly status?: string | null;
  readonly updatedAt?: string | null;
}

type LazySessionNordigen = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<SessionNordigen, 'id'>;
    readOnlyFields: 'updatedAt';
  };
  readonly id: string;
  readonly createdAt?: string | null;
  readonly institutionId?: string | null;
  readonly agreement?: string | null;
  readonly reference?: string | null;
  readonly link?: string | null;
  readonly status?: string | null;
  readonly updatedAt?: string | null;
}

export declare type SessionNordigen = LazyLoading extends LazyLoadingDisabled ? EagerSessionNordigen : LazySessionNordigen

export declare const SessionNordigen: (new (init: ModelInit<SessionNordigen>) => SessionNordigen) & {
  copyOf(source: SessionNordigen, mutator: (draft: MutableModel<SessionNordigen>) => MutableModel<SessionNordigen> | void): SessionNordigen;
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