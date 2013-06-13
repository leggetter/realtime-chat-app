describe("The ChatViewModel class", function() {
  
	var dummyView = {
		addListener: function(){}
	};

  it("is defined", function() {
    expect( typeof chatjs.ChatViewModel !== 'undefined' ).toBe( true );
  });

  it("is a function", function() {
    expect( typeof chatjs.ChatViewModel === 'function' ).toBe( true );
  });

  it("is an Observable", function() {
  	var model = new chatjs.ChatModel();
  	var viewModel = new chatjs.ChatViewModel( dummyView, model );
    expect( viewModel instanceof chatjs.Observable ).toBe( true );
  });

  it( "updates the model when a new message is added", function() {
  	var stubModel = {
  		called: false,
  		addListener: function() {},
  		addMessage: function() {
  			this.called = true;
  		}
  	};

  	var viewModel = new chatjs.ChatViewModel( dummyView, stubModel );
  	viewModel.addMessage( { text: 'some text' } );

  	expect( stubModel.called ).toBe( true );

  });

});