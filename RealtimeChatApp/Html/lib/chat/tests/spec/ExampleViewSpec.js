describe("A View", function() {
  
  it("is informed when a new message is added to a ChatViewModel", function() {
    var model = new chatjs.ChatModel();
    var stubView = {
      called: false,
      messageAdded: function( message ) {
        this.called = true;
      }
    };
    var viewModel = new chatjs.ChatViewModel( stubView, model );
    viewModel.messageAdded( { text: 'some text' } );

    expect( stubView.called ).toBe( true );
  });

});