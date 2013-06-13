( function( exports ) {

	/**
	 * namespace
	 */
	var chatjs = {};

	function Observable() {
		this._listeners = [];
	}

	Observable.prototype.addListener = function( listener ) {
		if( !listener ) {
			throw new Error( 'listener is required' );
		}

		this._listeners.push( listener );
	};

	/**
	 * Call the listener function identified by <code>name</code>,
	 * passing the value of <code>data</code>.
	 */
	Observable.prototype.notify = function( name, data ) {
		var listener;
		for( var i = 0, l = this._listeners.length; i < l; ++i ) {
			listener = this._listeners[ i ];
			listener[ name ]( data );
		}
	};

	chatjs.Observable = Observable; // for testing

	function WrappedObservable( toWrap ) {
		Observable.call( this );

		if( toWrap.notify ) {
			throw new Error( 'toWrap.notify must not be defined' );
		}

		var self = this;
		toWrap.notify = function( name, data ) {
			self.notify( name, data );
		};
	};
	WrappedObservable.prototype = Object.create( Observable.prototype );

	/**
	 * ChatJS
	 */
	function ChatJS( view, dataProvider ) {
		var model = new chatjs.ChatModel( dataProvider );
		this.viewModel = new chatjs.ChatViewModel( view, model );
	}
	chatjs.ChatJS = ChatJS;

	/**
	 * ChatModel
	 */
	function ChatModel( dataProvider ) {
		Observable.call( this );

		if( dataProvider ) {
			// user supplied data provider.
			// all they should have to do is call this.notify
			dataProvider = new WrappedObservable( dataProvider );
		}
		else {
			dataProvider = new InMemoryDataProvider();
		}

		this._dataProvider = dataProvider;
		this._dataProvider.addListener( this );

		this._messages = [];
		this._users = [];
	};
	ChatModel.prototype = Object.create( Observable.prototype );

	ChatModel.prototype.addMessage = function( message ) {
		this._dataProvider.addMessage( message );
	};

	ChatModel.prototype.userAdded = function( user ) {
		this._users.push( user );
	};
	ChatModel.prototype.userRemoved = function( user ) {
		throw 'not implemented';
	};
	ChatModel.prototype.messageAdded = function( message ) {
		this._messages.push( message );
		this.notify( 'messageAdded', message );
	};
	ChatModel.prototype.messageRemoved = function( message ) {
		throw 'not implemented';
	};

	chatjs.ChatModel = ChatModel;

	/**
	 * Interface to listen to ChatModel events
	 */
	// function ChatModelListener() {
	// };
	// ChatModelListener.prototype.userAdded = function( user ) {};
	// ChatModelListener.prototype.userRemoved = function( user ) {};
	// ChatModelListener.prototype.messageAdded = function( message ) {};
	// ChatModelListener.prototype.messageRemoved = function( message ) {};

	// chatjs.ChatModelListener = ChatModelListener;
	
	function InMemoryDataProvider() {
		Observable.call( this );
	};
	InMemoryDataProvider.prototype = Object.create( Observable.prototype );

	InMemoryDataProvider.prototype.addMessage = function( message ) {
		var self = this;
		setTimeout( function() {
			self.notify( 'messageAdded', message );
		}, 0 );
	};

	InMemoryDataProvider.prototype.addUser = function( user ) {
		var self = this;
		setTimeout( function() {
			self.notify( 'userAdded', user );
		}, 0 );
	};

	chatjs.InMemoryDataProvider = InMemoryDataProvider;

	/**
	 * ChatViewModel
	 */
	function ChatViewModel( view, model ) {
		Observable.call( this );

		this.users = [];
		this.messages = [];

		this._model = model;

		this._model.addListener( this );
		this.addListener( view );
	};
	ChatViewModel.prototype = Object.create( Observable.prototype );

	ChatViewModel.prototype.userAdded = function( user ) {
		this.users.push( user );
	};
	ChatViewModel.prototype.userRemoved = function( user ) {
		throw 'not implemented';
	};
	ChatViewModel.prototype.messageAdded = function( message ) {
		this.messages.push( message );

		this.notify( 'messageAdded', message );
	};
	ChatViewModel.prototype.messageRemoved = function( message ) {
		throw 'not implemented';
	};

	/**
	 * addMessage should only be called by the View.
	 */
	ChatViewModel.prototype.addMessage = function( message ) {
		// TODO: validate message object
		// * minimum message size
		// * strip whitespace from start and end

		// allow new messages from the view should be set to false
		// until the new message has come back from the model as added

		this._model.addMessage( message );

		return [];
	};

	ChatViewModel.prototype.addUser = function( user ) {
		// TODO: validate user object

		this._model._addUser( user );

		return [];
	};

	chatjs.ChatViewModel = ChatViewModel;

	/**
	 * User
	 */
	chatjs.User = function( uid ) {
		if( !uid ) {
			throw new Error( "uid is required" );
		}

		this.uid = uid;
	};

	/**
	 * Message
	 */
	chatjs.Message = function( uid ) {
		if( !uid ) {
			throw new Error( "uid is required" );
		}

		this.uid = uid;
	};

	exports.chatjs = chatjs;

} )( window );