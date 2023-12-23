import React from 'react';
import "./PostRules.css";


function PostRules() {
    return (
        <div className='Post-Rules-Container'>
            <div className='Rules-Header'>
                <h4>Posting to InstaChat</h4>
            </div>
            <ul className='Rules-List'>
                <ol className='Rules-List-ol'>
                    <li id='rule-1'>
                        1. Remember the human.
                    </li>
                    <li id='rule-2'>
                        2. Behave like you would in real life.
                    </li>
                    <li id='rule-3'>
                        3. Look for the original source of content.
                    </li>
                    <li id='rule-4'>
                        4. Search for duplicates before posting.
                    </li>
                    <li id='rule-5'>
                        5. Read the community's rules.
                    </li>
                </ol>
            </ul>

        </div>
    );
}

export default PostRules;
