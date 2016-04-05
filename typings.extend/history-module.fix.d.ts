declare namespace HistoryModule {
	type Action = 'PUSH' | 'REPLACE' | 'POP';

	type BeforeUnloadHook = () => string | void;

	type CreateLocation = (path: string, locationObj: Object) => Location;

	type CreateHistory<any> = () => any;

	type Hash = string;

	interface History {
		listenBefore(hook: TransitionHook): Function;
		listen(listener: LocationListener): Function;
		transitionTo(location: Location): void;
		push(location: LocationDescriptor): void;
		replace(location: LocationDescriptor): void;
		go(n: number): void;
		goBack(): void;
		goForward(): void;
		createKey(): LocationKey;
		createLocation: CreateLocation;
		createPath(location: LocationDescriptor): Path;
		createHref(location: LocationDescriptor): Href;
	}

	interface HistoryOptions {
		getUserConfirmation?(message: string, callback: (boolean) => void): void;
	}

	interface BeforeUnload {
		listenBeforeUnload?(callBack: () => string | boolean | void): void;
	}

	interface QueryOptions {
		parseQueryString?(queryString: string): any;
		stringifyQuery?(query: Object): string;
	}

	interface QueryString {
	}

	interface HistoryQueries {

	}

	interface BasenameOptions {
		basename?: string;
	}

	type Href = string;

	interface Location{
		pathname?: Pathname;
		search?: Search;
		query?: Query;
		state?: LocationState;
		action?: Action;
		key?: LocationKey;
	}

	interface LocationDescriptorObject{
		pathname?: Pathname;
		search?: Search;
		query?: Query;
		state?: LocationState;
	}

	type LocationDescriptor = LocationDescriptorObject | Path;

	type LocationKey = string;

	type LocationListener = (location: Location) => void;

	type LocationState = Object;

	type Path = string;

	type Pathname = string;

	type Query = Object;

	type Search = string;

	type TransitionHook = (location: Location, callback?: Function) => any;

	export const createLocation: CreateLocation;

	export const createHistory: CreateHistory<any>;

	export const createHashHistory: CreateHistory<any>;

	export const createMemoryHistory: CreateHistory<any>;

}
