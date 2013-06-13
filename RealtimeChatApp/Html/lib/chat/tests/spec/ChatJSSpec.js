describe("A ChatJS View", function() {
  
  it("is informed when a new message is added via a data provider", function() {
    var stubDataProvider = function() {
    };
	var stubView = {
      called: false,
      messageAdded: function( message ) {
        this.called = true;
      }
    };
    var chat = new chatjs.ChatJS( stubView, stubDataProvider );

    stubDataProvider.notify( 'messageAdded', { uuid: 'aUUID', text: 'some text' } );

    expect( stubView.called ).toBe( true );
  });

});