import React from "react";
import AllMessagesPage from "../../all-messages/page";

const ChatPage = ({ params }: { params: { id: string } }) => {
    return <AllMessagesPage initialSelectedId={Number(params.id)} />;
};

export default ChatPage;
