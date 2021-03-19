import React, { memo} from 'react';
// import ReactHtmlParser from 'react-html-parser';
// import { v4 as uuidv4 } from 'uuid';
// import { ThumbsDown24, ThumbsUp24, Copy24, RequestQuote24 } from '@carbon/icons-react';
// import { Tooltip } from '@material-ui/core';
// import { withStyles } from "@material-ui/core/styles";
// import { voteAnswer } from '../../context/ApiCalls'
// import { GlobalContext } from '../../context/GlobalState';
// import { MessageContext } from '../../context/MessageContext';

// import './Chat.css';

const Message = memo(({ response }) => {
    // const { setSpinner } = useContext(GlobalContext)
    // const { addMessage, getAnswer } = useContext(MessageContext);
    // const [thumb, setThumb] = useState('');

    // const faqText = 'Questions that were most frequently asked in the last 7 days';
    // const TooltipWithStyles = withStyles({
    //     tooltip: {
    //         fontSize: "12px",
    //     }
    // })(Tooltip);
    // const tooltipText = {
    //     like: 'I like this',
    //     dislike: 'I dislike this',
    //     copy: 'Copy answer URL',
    //     ticket: 'Submit a new ticket'
    // }

    // const redirecToCAH = link => {
    //     window.open(link, '_blank');
    // }

    // const copyToClipBoard = (url) => {
    //     navigator.clipboard.writeText(`${url}`);
    //     showAlert('success', 'Copied!', 'Answer URL has been copied.', 2000);
    // }

    // const vote = async (vote, answer) => {
    //     if (!thumb) {
    //         try {
    //             setSpinner(true);
    //             if (vote === 'like') {
    //                 let res = await voteAnswer(answer, 1)
    //                 setThumb('liked')
    //                 console.log(res);
    //             } else if (vote === 'dislike') {
    //                 let res = await voteAnswer(answer, 0)
    //                 setThumb('disliked')
    //                 console.log(res);
    //             }
    //         } catch (err) {
    //             showAlert('danger', err.name, err.message);
    //         }
    //         setSpinner(false);
    //     }
    // }

    // const sendQuestion = (question, recommendation) => {
    //     addMessage({
    //         message: question
    //     });
    //     getAnswer(question, recommendation)
    // }

    return (
        <div className="answer">
            {response.message}
            {/* <div className="answer">
                {typeof response.message === 'string' ? ReactHtmlParser(response.message) : null}
            </div>
            <div className="answer">
                {response.message.answer ? response.message.preAnswerText ?
                    <div>
                        <strong>
                            {`${response.message.preAnswerText}: ${ReactHtmlParser(response.message.discoveryQuestion)}`}
                        </strong>
                        <div style={{ marginTop: "10px" }}>
                            {ReactHtmlParser(response.message.answer)}
                        </div>
                    </div>
                    :
                    <Fragment>
                        {ReactHtmlParser(response.message.answer)}
                        {(response.message.raiseTicketButton && response.message.raiseTicketButton.button && !response.message.raiseTicketButton.text) ?
                            <i className="copy" style={{ paddingLeft: "5px" }} onClick={() => getAnswer('ticket')}><TooltipWithStyles
                                title={tooltipText.ticket} arrow placement="top"><RequestQuote24 /></TooltipWithStyles>
                            </i> : null
                        }
                    </Fragment>
                    : null}
            </div>
            <div>
                {response.message.recommendations && response.message.recommendations.length ?
                    <div className={darkMode ? "recommendations recommendations-dark" : "recommendations recommendations-light"}>
                        <strong style={{ paddingBottom: "5px" }}>{response.message.recommendationsText}:</strong>
                        <ul style={{ listStyleType: 'disc', paddingLeft: "20px", marginBottom: "0px" }} >
                            {response.message.recommendations.map(recommendation => (
                                <li onClick={() => sendQuestion(recommendation.question, recommendation)} key={uuidv4()}><i className="recommendation"> {recommendation.question}</i></li>
                            ))}
                        </ul>
                    </div>
                    : null}
            </div>
            <div>
                {response.message.faq ?
                    <div className={darkMode ? "recommendations recommendations-dark" : "recommendations recommendations-light"}>
                        <strong style={{ paddingBottom: "5px" }}>{faqText}:</strong>
                        <ul style={{ listStyleType: 'disc', paddingLeft: "20px", marginBottom: "0px" }} >
                            {response.message.faq.map(e => (
                                <li onClick={() => sendQuestion(e)} key={uuidv4()}><i className="recommendation"> {e}</i></li>
                            ))}
                        </ul>
                    </div>
                    : null}
            </div>
            <div>
                {(response.message.raiseTicketButton && response.message.raiseTicketButton.button && response.message.raiseTicketButton.text)
                    || thumb === 'disliked' ?
                    <div style={{ padding: "10px 0px 0px" }}>
                        {response.message.raiseTicketButton.text ?
                            <span style={{ fontStyle: "italic", paddingRight: '5px' }}>{response.message.raiseTicketButton.text}</span> : null}
                        <i className="copy" onClick={() => getAnswer('ticket')}><TooltipWithStyles title={tooltipText.ticket} arrow placement="top"><RequestQuote24 /></TooltipWithStyles></i>
                    </div> : null
                }
            </div>
            {response.message.ticketList && response.message.ticketList.length ?
                <div style={{ paddingTop: "5px" }}>
                    {response.message.ticketList.map(ticket => (
                        <div key={ticket.buttonText}>
                            <div className="flex-row">
                                <button aria-label={`${ticket.buttonText} button`} className="primary-btn newTicketBtn d-inline" onClick={() => redirecToCAH(ticket.link)}>{ticket.buttonText}</button>
                                <div className="newTicketLabel d-inline">{`${ticket.text}`}</div>
                            </div>
                        </div>

                    ))}
                </div>
                : null}
            <div className="answer">
                {response.message.answerURL ?
                    <div>
                        <div className={darkMode ? "rating-dark d-flex" : "rating-light d-flex"}>
                            <div className="flex-grow-1 bd-highlight ">
                                {response.message.userQuestionId && response.message.top_class !== 'assistant' ?
                                    <span>
                                        {thumb === 'disliked' ? null : <div className="like grow">
                                            <i onClick={() => vote('like', response)} style={thumb === 'liked' ? { color: '#27831b' } : null}
                                                className="like" aria-hidden="true"><TooltipWithStyles title={tooltipText.like}
                                                    arrow placement="top"><ThumbsUp24 /></TooltipWithStyles></i></div>}
                                        {thumb === 'liked' ? null : <div className="dislike grow">
                                            <i onClick={() => vote('dislike', response)} style={thumb === 'disliked' ? { color: '#b61b1b' } : null}
                                                className="dislike" aria-hidden="true"><TooltipWithStyles title={tooltipText.dislike}
                                                    arrow placement="top"><ThumbsDown24 /></TooltipWithStyles></i></div>}
                                    </span>
                                    : null}
                                <div className="copy grow">
                                    <i onClick={() => copyToClipBoard(response.message.answerURL)}
                                        className="copy" aria-hidden="true"><TooltipWithStyles title={tooltipText.copy} arrow placement="top">
                                            <Copy24 /></TooltipWithStyles></i>
                                </div>
                            </div>
                            <div className={darkMode ? "bd-highlight confidence-dark" : "bd-highlight confidence-light"}>
                                {`From: ${response.message.top_class.toUpperCase()}, Confidence: ${Math.ceil(response.message.confidence * 100)}%`}
                            </div>
                        </div>
                    </div>
                    : null}
            </div> */}
        </div>
    );
})

export default Message;