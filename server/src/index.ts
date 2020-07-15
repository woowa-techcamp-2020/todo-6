import './LoadEnv'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';

// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});


/**
 *
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function foo(a:number, b:number){
    return a + b;
}